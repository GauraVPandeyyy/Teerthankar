import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Package, MapPin, Calendar, CreditCard, CheckCircle2 } from "lucide-react";
import * as api from "../services/api";
import { motion } from "framer-motion";

const OrderDetails = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const res = await api.getOrderDetails(order_id!);
        setOrder(res?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [order_id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full" />
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <h1 className="font-serif text-2xl font-bold mb-2">Order Not Found</h1>
        <Button onClick={() => navigate("/")} variant="outline">Back to Home</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/profile")} 
          className="mb-8 pl-0 hover:bg-transparent hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
        </Button>

        {/* Header Status */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-medium">Order #{order.order_id}</p>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              {order.order_status || "Processing"}
            </h1>
            <p className="text-slate-500 mt-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {/* {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} */}
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <div className="px-6 py-3 bg-green-50 text-green-700 rounded-full font-medium flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Payment Successful
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Items Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" /> Items Ordered
              </h2>
              <div className="space-y-6">
                {order.items.map((item: any) => {
                  const images = (() => {
                     try { return typeof item.product.images === 'string' ? JSON.parse(item.product.images) : item.product.images || [] } 
                     catch { return [] }
                  })();

                  return (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      key={item.id} 
                      className="flex gap-4 border-b border-slate-50 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="w-20 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 mb-1">{item.product.name}</h3>
                        <p className="text-sm text-slate-500 mb-2">Qty: {item.quantity}</p>
                        <p className="font-semibold text-slate-900">₹{Number(item.price).toLocaleString()}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Payment Info */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
               <h2 className="font-serif text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-600" /> Payment Details
              </h2>
              <div className="space-y-3 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{Number(order.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="h-px bg-slate-100 my-2" />
                <div className="flex justify-between font-bold text-slate-900 text-lg">
                  <span>Total Paid</span>
                  <span>₹{Number(order.total_amount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 sticky top-24">
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" /> Shipping To
              </h2>
              <div className="text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900 mb-2">{order.fullName}</p>
                <p>{order.address_line1}</p>
                {order.address_line2 && <p>{order.address_line2}</p>}
                <p>{order.city}, {order.state}</p>
                <p className="font-medium mt-1">{order.pincode}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center">
                  Need help with this order? <br/>
                  <a href="/contact" className="text-amber-600 hover:underline">Contact Support</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;