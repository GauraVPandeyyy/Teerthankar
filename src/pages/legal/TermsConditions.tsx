import React from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import { Separator } from '../../components/ui/separator';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-slate-500">Please read these terms carefully before using our services.</p>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900">
            
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8 not-prose flex gap-4">
              <Scale className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-slate-900 mb-1">Governing Law</h4>
                <p className="text-sm text-slate-600">These Terms shall be governed by and defined following the laws of India. Teerthankar Jewels and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute.</p>
              </div>
            </div>

            <h3>1. Introduction</h3>
            <p>Welcome to <strong>Teerthankar Jewels</strong>. By accessing our website and purchasing our artificial jewelry products, you agree to be bound by the following terms and conditions.</p>

            <h3>2. Product Accuracy & Disclaimer</h3>
            <p>We have made every effort to display as accurately as possible the colors and images of our products. However:</p>
            <ul>
              <li><strong>Color Variation:</strong> We cannot guarantee that your computer monitor's display of any color will be accurate.</li>
              <li><strong>Handcrafted Nature:</strong> As many of our items are hand-finished, slight irregularities in plating or stone setting are part of the bespoke charm and are not considered defects.</li>
            </ul>

            <h3>3. Pricing and Billing</h3>
            <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>

            <h3>4. Jewelry Care & Usage</h3>
            <p>Our products are high-quality artificial jewelry (Gold/Rose Gold Plated, Oxidized Silver, etc.). They are not made of solid gold or silver unless explicitly stated. We are not responsible for damage caused by improper care (e.g., exposure to perfumes, water, or chemicals).</p>

            <h3>5. Limitation of Liability</h3>
            <p>In no case shall Teerthankar Jewels, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.</p>

            <Separator className="my-8" />

            <div className="flex items-center gap-3 text-sm text-slate-500 not-prose">
              <AlertCircle className="w-4 h-4" />
              <span>We reserve the right to refuse service to anyone for any reason at any time.</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;