import React from 'react';
import { Github, Twitter, Linkedin, Waypoints, ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 relative overflow-hidden">
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col items-start gap-8">
            <Link to="/" className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]">
              <div className="p-2 bg-brand-500 rounded-xl text-white shadow-lg shadow-brand-500/20">
                <Waypoints size={22} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight text-ink-900">
                Overseer
              </span>
            </Link>
            
            <p className="text-slate-500 leading-relaxed text-base max-w-xs">
              The intelligent control plane for enterprise AI. Ship faster while maintaining complete governance and cost control.
            </p>

            <div className="w-full max-w-sm">
               <h4 className="text-[10px] font-black text-ink-900 uppercase tracking-[0.2em] mb-4">Stay in the loop</h4>
               <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                   <Mail size={16} />
                 </div>
                 <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-14 py-3.5 text-sm outline-none focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 transition-all placeholder:text-slate-400 shadow-sm"
                 />
                 <button className="absolute right-2 top-2 bottom-2 bg-ink-900 text-white px-3 rounded-xl hover:bg-brand-500 transition-all duration-300 shadow-sm flex items-center justify-center">
                    <ArrowRight size={18} />
                 </button>
               </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-8">
            
            <div className="space-y-6">
              <h4 className="text-sm font-display font-bold text-ink-900 tracking-wide">Platform</h4>
              <ul className="space-y-4">
                {['Observability', 'Model Routing', 'Cost Control', 'Prompt Security', 'Evaluations'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-all hover:translate-x-1 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-display font-bold text-ink-900 tracking-wide">Resources</h4>
              <ul className="space-y-4">
                {['Documentation', 'API Reference', 'Case Studies', 'AI Safety Guide', 'System Status'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-all hover:translate-x-1 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-display font-bold text-ink-900 tracking-wide">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Customers', 'Legal & Trust', 'Contact Sales'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-all hover:translate-x-1 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-all hover:translate-x-1 flex items-center gap-2">
                    Careers
                    <span className="text-[9px] font-black bg-brand-50 text-brand-600 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Hiring</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 order-2 lg:order-1">
            <p className="text-xs text-slate-400 font-medium">© 2025 Overseer Inc. All rights reserved.</p>
            <div className="hidden sm:block w-px h-4 bg-slate-200"></div>
            <div className="flex gap-6">
               <a href="#" className="text-xs font-semibold text-slate-500 hover:text-ink-900 transition-colors">Privacy Policy</a>
               <a href="#" className="text-xs font-semibold text-slate-500 hover:text-ink-900 transition-colors">Terms of Service</a>
               <a href="#" className="text-xs font-semibold text-slate-500 hover:text-ink-900 transition-colors">Cookie Policy</a>
            </div>
          </div>

          <div className="flex items-center gap-8 order-1 lg:order-2">
             {/* Socials */}
             <div className="flex gap-2">
               {[
                 { icon: Twitter, href: "#" },
                 { icon: Github, href: "#" },
                 { icon: Linkedin, href: "#" }
               ].map((social, i) => (
                 <a 
                   key={i} 
                   href={social.href} 
                   className="text-slate-400 hover:text-white hover:bg-ink-900 transition-all p-2.5 rounded-xl border border-transparent hover:border-ink-900 active:scale-90"
                 >
                    <social.icon size={18} />
                 </a>
               ))}
             </div>
             
             {/* Status Badge */}
             <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl group cursor-default">
               <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </div>
               <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700 transition-colors">Systems Normal</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual flare at the very bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent"></div>
    </footer>
  );
};