import React from 'react';
import { Truck, MapPin, CalendarClock } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4">Shipping Policy</h1>
            <p className="text-slate-500">Delivering elegance to your doorstep.</p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Free Shipping</h3>
                <p className="text-white/70 text-sm">On all orders above ₹999</p>
              </div>
            </div>
            <div className="h-px w-full md:w-px md:h-12 bg-white/20" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <CalendarClock className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Fast Dispatch</h3>
                <p className="text-white/70 text-sm">Within 24-48 Hours</p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900">
            <h3>1. Domestic Shipping (India)</h3>
            <p>Teerthankar Jewels ships to almost all pin codes across India.</p>
            <ul>
              <li><strong>Standard Delivery:</strong> 5-7 Business Days.</li>
              <li><strong>Shipping Cost:</strong> Flat ₹50 for orders below ₹999. Free for orders above ₹999.</li>
            </ul>

            <h3>2. Order Processing</h3>
            <p>All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>

            <h3>3. How do I check the status of my order?</h3>
            <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>

            <h3>4. International Shipping</h3>
            <p>Currently, we do not ship outside of India. We are working on expanding our logistics to serve international customers soon.</p>

            <h3>5. Incorrect Address</h3>
            <p>We are not responsible for orders delivered to an incorrect or incomplete address provided by the customer. Please double-check your shipping details at checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;