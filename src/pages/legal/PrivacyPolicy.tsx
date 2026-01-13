import React from 'react';
import { Shield, Lock, Eye, Server } from 'lucide-react';
import { Separator } from '../../components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-500">Last Updated: October 2023</p>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
            
            <p className="lead text-lg">
              At <strong>Teerthankar Jewels</strong>, we treat your privacy with the same respect as we treat our craftsmanship. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit or make a purchase from our store.
            </p>

            <Separator className="my-8" />

            <div className="grid md:grid-cols-2 gap-8 mb-12 not-prose">
              {[
                { icon: Shield, title: "Data Protection", desc: "We use banking-grade encryption to protect your personal data." },
                { icon: Lock, title: "Secure Payments", desc: "We never store your credit/debit card details on our servers." },
                { icon: Eye, title: "Transparency", desc: "We never sell your data to third-party advertisers." },
                { icon: Server, title: "Data Minimization", desc: "We only collect what is necessary to fulfill your order." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 text-amber-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3>1. Information We Collect</h3>
            <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
            <p>When you attempt to make a purchase, we collect specific information including:</p>
            <ul>
              <li>Name and Billing/Shipping Address</li>
              <li>Payment Information (processed securely by our payment gateway partners)</li>
              <li>Email Address and Phone Number</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>

            <h3>3. Sharing Your Personal Information</h3>
            <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example:</p>
            <ul>
              <li><strong>Payment Gateways:</strong> We use secure gateways (like Razorpay/PhonePe) to process transactions.</li>
              <li><strong>Logistics Partners:</strong> We share delivery details with courier partners to ensure your jewelry reaches you safely.</li>
            </ul>

            <h3>4. Data Retention</h3>
            <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>

            <h3>5. Contact Us</h3>
            <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:support@teerthankarjewels.com" className="text-amber-600 no-underline hover:underline">support@teerthankarjewels.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;