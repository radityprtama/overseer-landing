import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does Overseer impact my existing API latency?",
    answer: "Overseer is built on a globally distributed edge network. The overhead is typically under 10ms. For many requests, our semantic caching actually reduces total latency by up to 90% by serving responses directly from the edge."
  },
  {
    question: "Do you store the content of my prompts or model responses?",
    answer: "By default, Overseer is a pass-through proxy. We only store metadata (tokens, latency, cost) for analytics. Full request/response logging is optional and can be configured to use your own encrypted storage buckets for total data sovereignty."
  },
  {
    question: "Can I use Overseer with my existing OpenAI or Anthropic SDKs?",
    answer: "Yes. Overseer is 100% compatible with official SDKs. You simply change the `baseURL` to our gateway and use your Overseer API key. No refactoring or proprietary libraries required."
  },
  {
    question: "How does the 'Global Failover' feature work?",
    answer: "If your primary provider (e.g., OpenAI) experiences a regional outage or high error rates, Overseer automatically reroutes traffic to your secondary choice (e.g., Anthropic or Azure OpenAI) based on your predefined priority policies."
  },
  {
    question: "Does Overseer help with SOC2 or HIPAA compliance?",
    answer: "Absolutely. Overseer centralizes your AI audit trail, enforces PII redaction guardrails, and provides identity-aware access control (SSO), which are critical components for meeting modern security compliance standards."
  },
  {
    question: "Is there a limit to how many models I can route through the gateway?",
    answer: "There are no limits on the number of models or providers. You can unify OpenAI, Anthropic, Google, Mistral, and even local Ollama instances under a single standardized API interface."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-50 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
            Support
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-ink-900 mb-6 tracking-tight">
            Common questions.
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to know about the Overseer platform and AI governance.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`
                  group rounded-2xl border transition-all duration-300
                  ${isOpen 
                    ? 'border-brand-200 bg-brand-50/30 shadow-sm' 
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md hover:shadow-slate-100'
                  }
                `}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-brand-700' : 'text-ink-900'}`}>
                    {item.question}
                  </span>
                  <div className={`
                    shrink-0 ml-4 p-2 rounded-full transition-all duration-500
                    ${isOpen ? 'bg-brand-500 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'}
                  `}>
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </button>
                
                <div 
                  className={`
                    grid transition-all duration-300 ease-in-out overflow-hidden
                    ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
           {/* Animated Background Decoration */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000"></div>
           
           <div className="flex items-center gap-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-400 border border-white/10">
                 <MessageSquare size={24} />
              </div>
              <div className="text-center md:text-left">
                 <h4 className="text-xl font-bold">Still have questions?</h4>
                 <p className="text-slate-400 text-sm">We're here to help you secure your AI stack.</p>
              </div>
           </div>

           <a 
              href="mailto:support@overseer.ai" 
              className="relative z-10 px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-brand-500 hover:text-white transition-all duration-300 shadow-xl active:scale-95"
           >
              Chat with us
           </a>
        </div>
      </div>
    </section>
  );
};