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

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
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

  // redirect if cart empty
  if (!items || items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // compute totals
  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 98;
  const total = subtotal + shipping;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address_line1 || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please login to place order');
      navigate('/');
      return;
    }

    setIsProcessing(true);

    // Build items payload with product_code (if available)
    const itemsPayload = items.map(i => {
      const prod = getProductById ? getProductById(i.product_id) : undefined;
      const product_code = prod?.product_code ?? prod?.product_code ?? prod?.product_code ?? ''; // tolerant
      return {
        product_id: Number(i.product_id),
        quantity: Number(i.quantity),
        product_code, // we include it as requested
      };
    });

    // Final payload according to backend API
    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      address_line1: formData.address_line1,
      address_line2: formData.address_line2 || undefined,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      payment_method: paymentMethod.toUpperCase(), // backend examples use "COD"
      shipping,
      items: itemsPayload,
      // include totals as extra info (backend may recalc)
      subtotal,
      total
    };

    try {
      const res = await api.createOrder(payload); // maps to /api/orders/placeOrder
      if (res?.status) {
        toast.success(res?.message || 'Order placed successfully');
        // clear cart locally & refresh
        await clearCart();
        // navigate to profile / order history; backend returns order id in data
        navigate('/profile');
      } else {
        toast.error(res?.message || 'Order failed');
      }
    } catch (err: any) {
      console.error('Order error', err);
      const msg = err?.response?.data?.message || 'Failed to place order';
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address_line1">Address Line 1 *</Label>
                    <Input id="address_line1" name="address_line1" value={formData.address_line1} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address_line2">Address Line 2 (optional)</Label>
                    <Input id="address_line2" name="address_line2" value={formData.address_line2} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg mb-3 cursor-pointer hover:bg-muted">
                    <div  />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5" />
                      <span>Credit / Debit Card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg mb-3 cursor-pointer hover:bg-muted">
                    <div  />
                    <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="w-5 h-5" />
                      <span>UPI Payment</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <div />
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
                        {/* optional: show product_code if available from product context */}
                        {getProductById && getProductById(item.product_id)?.product_code && (
                          <p className="text-xs text-muted-foreground">Code: {getProductById(item.product_id).product_code}</p>
                        )}
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
                  {isProcessing ? 'Processing...' : 'Place Order'}
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
