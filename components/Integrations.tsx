import React from 'react';

const logos = [
  "OpenAI", "Anthropic", "Google Gemini", "Mistral AI", "Azure OpenAI", "Groq", "Ollama", "LangChain", "Vercel SDK"
];

export const Integrations: React.FC = () => {
  return (
    <section id="integrations" className="py-20 bg-white border-y border-slate-100 overflow-hidden">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Works with your stack</span>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="flex gap-16 animate-marquee w-max hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={`${logo}-${i}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-2xl font-display font-bold text-slate-800 whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
