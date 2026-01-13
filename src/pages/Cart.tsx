import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const handleUpdateQuantity = async (productId: number, newQty: number) => {
    setIsUpdating(productId);
    await updateQuantity(productId, newQty);
    setIsUpdating(null);
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6"
        >
          <ShoppingBag className="w-10 h-10 text-amber-500/50" />
        </motion.div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Your Bag is Empty</h1>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          Looks like you haven't discovered our latest treasures yet.
        </p>
        <Link to="/shop">
          <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 mt-[100px]">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-10">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product_id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="group relative flex flex-row gap-6 bg-white p-2 md:p-6 rounded-xl md:rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-32 aspect-square rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start md:mb-2">
                        <Link to={`/product/${item.product_id}`} className="font-serif text-[14px] md:text-xl font-medium text-slate-900 hover:text-amber-700 transition-colors md:line-clamp-2">
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-2 md:-mr-2 md:-mt-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-[12px] pt-0 md:text-sm text-slate-500 uppercase tracking-wider font-medium">
                        Unit Price: ₹{Number(item.unitPrice).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-2 md:mt-6">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-1 md:gap-3 bg-slate-50 rounded-full mx-1 md:p-1 border border-slate-200">
                        <button
                          onClick={() => handleUpdateQuantity(item.product_id, Math.max(0, item.quantity - 1))}
                          disabled={item.quantity <= 1 || isUpdating === item.product_id}
                          className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600 hover:text-amber-600 disabled:opacity-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-4 md:w-8 text-center font-medium text-slate-900">
                           {isUpdating === item.product_id ? "..." : item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                          disabled={isUpdating === item.product_id}
                          className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600 hover:text-amber-600 disabled:opacity-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right">
                        <p className="text-[14px] md:text-2xl font-semibold text-slate-900">
                          ₹{Number(item.total_price || (item.unitPrice * item.quantity)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white p-8 rounded-xl md:rounded-[2rem] shadow-lg border border-slate-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -z-10 opacity-50" />
                
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="h-px bg-slate-100 my-4" />
                  <div className="flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate("/checkout")}
                  className="w-full h-14 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-lg font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
                >
                  Checkout Securely
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;