import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden relative">
      {/* 
        Custom SVG Clip Path for the 'Inward Curve' (Concave) effect.
        We use objectBoundingBox so the curve scales proportionally with the container.
      */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="concave-cta" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 Q 0.5,0.12 1,0 L 1,1 Q 0.5,0.88 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div 
        className="relative w-full bg-gradient-to-r from-brand-600 to-brand-500 py-32 md:py-52 flex items-center justify-center"
        style={{
          clipPath: 'url(#concave-cta)'
        }}
      >
        {/* Subtle deepening gradient for visual volume */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-10 tracking-tight leading-[1.1]">
            Ready to regain control <br className="hidden md:block" /> of your AI infrastructure?
          </h2>
          
          <div className="flex justify-center">
            <button className="bg-white text-brand-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-brand-900/10 hover:shadow-brand-900/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 group">
              Start for Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="mt-12 text-white/80 text-xs font-bold uppercase tracking-[0.4em] select-none">
            Security. Visibility. Performance.
          </p>
        </div>
      </div>
    </section>
  );
};
