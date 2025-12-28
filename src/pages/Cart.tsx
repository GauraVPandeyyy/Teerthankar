// src/pages/Cart.tsx
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { getProductById } = useProducts();

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-gold">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = getProductById ? getProductById(item.product_id) : null;
            const stock = Number(product?.quantity ?? 0);
            const canIncrease = item.quantity < stock;
            const img = (item.images && item.images[0]) || (product?.images && (Array.isArray(product.images) ? product.images[0] : (JSON.parse(product.images || '[]')[0] || '')) ) || '';

            return (
              <Card key={item.product_id} className="p-6">
                <div className="flex gap-6">
                  <img src={img} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{product?.product_code || ''}</p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}>
                          <Minus className="w-4 h-4" />
                        </Button>

                        <span className="px-4">{item.quantity}</span>

                        <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.product_id, item.quantity + 1)} disabled={!canIncrease}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-lg">₹{Number(item.total_price || (item.unitPrice * item.quantity)).toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{stock <= 0 ? 'Out of stock' : `${stock} in stock`}</div>
                        </div>

                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product_id)} className="text-destructive">
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 sticky top-20">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toLocaleString()}</span>
          </div>

          <Link to="/checkout">
            <Button className="w-full bg-gradient-gold mt-6">Checkout</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
