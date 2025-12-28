import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import * as api from "../services/api";

const OrderDetails = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    loadOrder();
  }, [order_id]);

  if (loading)
    return (
      <div className="p-10 text-center">
        <p>Loading order details...</p>
      </div>
    );

  if (!order)
    return (
      <div className="p-10 text-center">
        <p>Order not found.</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <h1 className="font-serif text-4xl font-bold mb-6">
        Order {order.order_id}
      </h1>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <p>Name: <strong>{order.fullName}</strong></p>
        <p>Purchase Date: <strong>{order.date}</strong></p>
        <p>Status: <strong>{order.order_status}</strong></p>
        <p>Total Amount: <strong>₹{Number(order.total_amount).toLocaleString()}</strong></p>
        <p>Shipping Amount: <strong>₹{Number(order.shipping).toLocaleString()}</strong></p>
        <p>Payment Method: {order.payment_method}</p>
        <p>Tracking ID: {order.tracking_id}</p>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <p>{order.address_line1}</p>
        {order.address_line2 && <p>{order.address_line2}</p>}
        <p>
          {order.city}, {order.state} - {order.pincode}
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Items</h2>

        <div className="space-y-4">
          {order.items.map((item: any) => {
            const images = JSON.parse(item.product.images || "[]");
            return (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={images[0]}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  {/* <p className="text-sm text-muted-foreground">
                    Code: {item.product.product_code}
                  </p> */}
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    ₹{Number(item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default OrderDetails;
