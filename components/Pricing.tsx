'use client';

import { useState } from 'react';
import { Check, HelpCircle, ChevronDown, ChevronUp, Sparkles, Building2, Zap } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = [
    {
      name: "Starter",
      description: "For individuals and side projects.",
      price: annual ? 0 : 0,
      features: [
        "Up to 10k requests/month",
        "1 Organization",
        "Community Support",
        "Basic Analytics",
        "100MB Audit Logs"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Pro",
      description: "For growing teams and startups.",
      price: annual ? 49 : 59,
      features: [
        "Unlimited requests",
        "Unlimited Organizations",
        "Priority Support",
        "Advanced Observability",
        "1yr Audit Log Retention",
        "PII Redaction",
        "Custom Rate Limits"
      ],
      cta: "Start Trial",
      highlight: true
    },
    {
      name: "Enterprise",
      description: "For large scale organizations.",
      price: "Custom",
      features: [
        "Private VPC Deployment",
        "SSO (SAML/OIDC)",
        "Dedicated Success Manager",
        "SLA Guarantees",
        "Custom Integrations",
        "Audit Log Export",
        "Role-Based Access Control"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  const faqs = [
    {
      q: "Does Overseer replace my OpenAI API keys?",
      a: "No. You provide your existing API keys in the Overseer dashboard (or via environment variables for self-hosted). We act as a proxy to route requests, but the billing for model usage still happens directly with your providers."
    },
    {
      q: "How much latency does Overseer add?",
      a: "Overseer is built on Cloudflare Workers and adds minimal latency (typically < 10ms). We also offer caching which can significantly reduce latency for repeated prompts."
    },
    {
      q: "Can I self-host Overseer?",
      a: "Yes! Our Enterprise plan includes options for deployment in your own VPC (AWS, GCP, Azure) or on-premise infrastructure via Docker containers."
    },
    {
      q: "Is my data used to train models?",
      a: "Absolutely not. Overseer is a pass-through layer. We do not store request bodies unless you enable 'Full Audit Logging', and we never use customer data for model training."
    },
    {
      q: "What happens if I exceed my plan limits?",
      a: "We will email you when you approach your limit. For the Starter plan, requests may be rate-limited after a grace period. For Pro, we offer overage pricing."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-subtle min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-ink-900 mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Start free, upgrade as you grow. Control your AI infrastructure costs without breaking the bank.
          </p>
          
          {/* Enhanced Toggle */}
          <div className="flex items-center justify-center gap-6">
            <span className={`text-sm font-bold transition-colors duration-300 ${!annual ? 'text-ink-900' : 'text-slate-400'}`}>
              Monthly
            </span>
            
            <button 
              onClick={() => setAnnual(!annual)}
              className={`group w-14 h-8 rounded-full relative transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                annual ? 'bg-brand-500 shadow-lg shadow-brand-500/20' : 'bg-slate-200'
              }`}
              aria-label="Toggle annual pricing"
            >
              {/* Toggle Knob with Elastic Animation */}
              <div 
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>

            <span className={`text-sm font-bold flex items-center gap-2 transition-colors duration-300 ${annual ? 'text-ink-900' : 'text-slate-400'}`}>
              Yearly 
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-brand-100 text-brand-700 font-black uppercase tracking-tighter">
                -20% Off
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`
                relative rounded-2xl p-8 border transition-all duration-300 flex flex-col
                ${plan.highlight 
                  ? 'bg-white border-brand-500 shadow-xl shadow-brand-500/10 scale-105 z-10' 
                  : 'bg-white border-slate-200 hover:border-brand-200 hover:shadow-lg'
                }
              `}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles size={12} />
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-ink-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500 h-10">{plan.description}</p>
              </div>

              <div className="mb-8 h-12">
                {typeof plan.price === 'number' ? (
                  <div className="flex items-baseline gap-1 animate-fade-in-up">
                    <span className="text-4xl font-display font-bold text-ink-900 transition-all duration-300">
                      ${plan.price}
                    </span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                ) : (
                  <div className="text-4xl font-display font-bold text-ink-900">{plan.price}</div>
                )}
                {annual && typeof plan.price === 'number' && plan.price > 0 && (
                   <div className="text-[11px] text-brand-600 font-bold mt-1 uppercase tracking-wider animate-fade-in-up">Billed ${plan.price * 12} yearly</div>
                )}
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className={`mt-0.5 p-0.5 rounded-full flex-shrink-0 ${plan.highlight ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>
                       <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`
                w-full py-4 rounded-xl font-bold transition-all duration-200
                ${plan.highlight 
                  ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 active:scale-[0.98]' 
                  : 'bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200 active:scale-[0.98]'
                }
              `}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-ink-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">
              Have a different question? <a href="#" className="text-brand-600 font-medium hover:underline">Contact our support team</a>.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-brand-200 transition-colors"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-ink-900">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-slate-400" size={20} />
                  ) : (
                    <ChevronDown className="text-slate-400" size={20} />
                  )}
                </button>
                <div 
                  className={`px-6 text-slate-600 text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-24 pt-12 border-t border-slate-200 grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                  <Building2 size={24} />
               </div>
               <h4 className="font-bold text-ink-900">Enterprise Ready</h4>
               <p className="text-sm text-slate-500">SSO, SLA, and dedicated support.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                  <Zap size={24} />
               </div>
               <h4 className="font-bold text-ink-900">Low Latency</h4>
               <p className="text-sm text-slate-500">Global edge network deployment.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                  <HelpCircle size={24} />
               </div>
               <h4 className="font-bold text-ink-900">24/7 Support</h4>
               <p className="text-sm text-slate-500">Always here when you need us.</p>
            </div>
        </div>

      </div>
    </div>
  );
};
