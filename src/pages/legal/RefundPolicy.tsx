import React from 'react';
import { RefreshCw, Video, Clock, CheckCircle2 } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4">Refund & Returns</h1>
            <p className="text-slate-500">Our promise of quality and your peace of mind.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
               { title: "7-Day Return", desc: "Easy return request within 7 days of delivery.", icon: Clock },
               { title: "Video Proof", desc: "Unboxing video required for damage claims.", icon: Video },
               { title: "Original Condition", desc: "Items must be unworn with tags intact.", icon: CheckCircle2 }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-amber-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900">
            <h3>1. Eligibility for Returns</h3>
            <p>We offer a <strong>7-Day Return Policy</strong>. You have 7 days after receiving your item to request a return. To be eligible:</p>
            <ul>
              <li>Your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.</li>
              <li>You must provide the receipt or proof of purchase.</li>
            </ul>

            <h3>2. Damages and Issues (Important)</h3>
            <p>Please inspect your order upon reception. <strong>An unboxing video is mandatory</strong> to claim a refund for damaged, defective, or incorrect items. Without a continuous unboxing video showing the shipping label and the damage, we may not be able to process the claim.</p>

            <h3>3. Non-returnable Items</h3>
            <p>Certain types of items cannot be returned, including:</p>
            <ul>
              <li>Custom products (such as special orders or personalized items).</li>
              <li>Sale items or gift cards.</li>
            </ul>

            <h3>4. Refund Process</h3>
            <p>We will notify you once we’ve received and inspected your return. If approved, you’ll be automatically refunded on your original payment method within 5-7 business days. For COD orders, we will request your bank account details or UPI ID to process the refund.</p>

            <h3>5. Cancellations</h3>
            <p>Orders can be cancelled before they are shipped. Once the order is dispatched (usually within 24 hours), it cannot be cancelled. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;