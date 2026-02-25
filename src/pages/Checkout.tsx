// src/pages/Checkout.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Banknote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import * as api from '../services/api';
import { useProducts } from '../contexts/ProductContext';

// Helper function to dynamically load the Razorpay SDK
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { getProductById } = useProducts();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'online' | 'cod'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: ''
  });

  if (!items || items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 98;
  const total = subtotal + shipping;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // 1. Check for empty fields
    if (!formData.fullName || !formData.phone || !formData.address_line1 || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    // 2. Mobile Number Validation (Indian standard: 10 digits, starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please login to place order');
      navigate('/');
      return;
    }

    setIsProcessing(true);

    const itemsPayload = items.map(i => {
      const prod = getProductById ? getProductById(i.product_id) : undefined;
      const product_code = prod?.product_code ?? ''; 
      return {
        product_id: Number(i.product_id),
        quantity: Number(i.quantity),
        product_code, 
      };
    });

    const backendPaymentMethod = paymentMethod === 'cod' ? 'COD' : 'ONLINE';

    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      address_line1: formData.address_line1,
      address_line2: formData.address_line2 || undefined,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      payment_method: backendPaymentMethod,
      shipping,
      items: itemsPayload,
      subtotal,
      total
    };

    try {
      const res = await api.createOrder(payload);

      if (backendPaymentMethod === 'COD') {
        if (res?.status) {
          toast.success(res?.message || 'Order placed successfully');
          await clearCart();
          navigate('/profile');
        } else {
          toast.error(res?.message || 'Order failed');
        }
        setIsProcessing(false);
      } else {
        if (res?.status && res?.razorpay_order_id) {
          const scriptLoaded = await loadRazorpayScript();
          
          if (!scriptLoaded) {
            toast.error('Failed to load Razorpay SDK. Please check your connection.');
            setIsProcessing(false);
            return;
          }

          const options = {
            key: res.razorpay_key,
            amount: res.amount,
            currency: "INR",
            name: "Teerthankar Jewels",
            description: "Payment for Order",
            order_id: res.razorpay_order_id,
            handler: async function (response: any) {
              try {
                setIsProcessing(true); 
                
                const verifyRes = await api.verifyPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                });

                if (verifyRes?.status) {
                  toast.success('Payment verified and order confirmed!');
                  await clearCart();
                  navigate('/profile');
                } else {
                  toast.error(verifyRes?.message || 'Payment verification failed');
                }
              } catch (error) {
                console.error("Verification Error:", error);
                toast.error('Payment verification failed. Please contact support.');
              } finally {
                setIsProcessing(false);
              }
            },
            prefill: {
              name: formData.fullName,
              contact: formData.phone,
              email: user?.email || "" 
            },
            theme: {
              color: "#d97706" 
            },
            // FIX 1: Handle Razorpay modal exit
            modal: {
              ondismiss: () => {
                setIsProcessing(false);
                toast.error("Payment cancelled by user. Please try again.");
              }
            }
          };

          // @ts-ignore
          const paymentObject = new window.Razorpay(options);
          
          paymentObject.on('payment.failed', function (response: any) {
            toast.error(response.error.description || 'Payment Failed');
            setIsProcessing(false);
          });

          paymentObject.open();

        } else {
          toast.error(res?.message || 'Failed to initialize payment gateway');
          setIsProcessing(false);
        }
      }
    } catch (err: any) {
      console.error('Order error', err);
      const msg = err?.response?.data?.message || 'Failed to place order';
      toast.error(msg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 mt-[100px]">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-10">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required disabled={isProcessing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    {/* FIX 2: Mobile input UX and numeric restriction */}
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone} 
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, ''); // Strips non-digits
                        setFormData({ ...formData, phone: numericValue });
                      }} 
                      placeholder="e.g. 9876543210"
                      required 
                      disabled={isProcessing} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address_line1">Address Line 1 *</Label>
                    <Input id="address_line1" name="address_line1" value={formData.address_line1} onChange={handleInputChange} required disabled={isProcessing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address_line2">Address Line 2 (optional)</Label>
                    <Input id="address_line2" name="address_line2" value={formData.address_line2} onChange={handleInputChange} disabled={isProcessing} />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required disabled={isProcessing} />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required disabled={isProcessing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required disabled={isProcessing} />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)} disabled={isProcessing}>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg mb-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5" />
                      <span>Credit / Debit Card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg mb-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="w-5 h-5" />
                      <span>UPI Payment</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Banknote className="w-5 h-5" />
                      <span>Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-72 overflow-auto">
                  {items.map((item) => (
                    <div key={item.product_id} className="flex gap-3">
                      <img src={(item.images && item.images[0]) || ''} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">₹{(item.unitPrice * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? 'text-primary' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-gold hover:opacity-90" disabled={isProcessing}>
                  {isProcessing ? 'Processing Payment...' : 'Place Order'}
                </Button>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;