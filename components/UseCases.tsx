import React, { useState } from 'react';
import { UseCase } from '../types';
import { CheckCircle2, Shield, PieChart, Code2, Lock, Activity, DollarSign, Key, Globe, Layout, ChevronRight } from 'lucide-react';

// --- Visual Components ---

const CtoVisual = () => (
  <div className="w-full h-full bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center group-hover:border-brand-200 transition-colors duration-500">
    {/* Background Grid */}
    <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
    
    {/* Abstract Security Visualization */}
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Central Core */}
      <div className="w-20 h-20 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center z-20 relative">
         <Shield className="text-brand-500" size={32} strokeWidth={1.5} />
         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      {/* Orbiting Elements (Simulating Shadow AI getting caught) */}
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
         {/* Node 1 */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
             <Globe size={14} className="text-slate-400" />
         </div>
         {/* Node 2 */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
             <Code2 size={14} className="text-slate-400" />
         </div>
      </div>

      {/* Scanning Radar */}
      <div className="absolute inset-[-20%] rounded-full border border-brand-500/20 border-dashed animate-[spin_8s_linear_infinite_reverse]"></div>
      <div className="absolute inset-0 rounded-full border border-slate-200 opacity-50"></div>
      
      {/* Scanning Beam */}
      <div className="absolute top-1/2 left-1/2 w-[140%] h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite]"></div>
    </div>

    {/* Alert Badge */}
    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur border border-slate-100 shadow-lg rounded-lg px-3 py-2 flex items-center gap-2 animate-fade-in-up">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono font-medium text-slate-600">Shadow AI Detected</span>
    </div>
  </div>
);

const FinanceVisual = () => (
  <div className="w-full h-full bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-8 transition-colors duration-500 group">
      {/* Chart Bars */}
      <div className="flex items-end gap-4 h-48 w-full max-w-[280px] relative z-10">
          {/* Bar 1 */}
          <div className="flex-1 bg-slate-200 rounded-t-lg relative overflow-hidden" style={{ height: '40%' }}>
             <div className="absolute bottom-0 left-0 right-0 bg-brand-300 w-full h-full origin-bottom animate-[growBar_3s_ease-in-out_infinite] group-hover:animate-none group-hover:h-full transition-all duration-500"></div>
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">ENG</div>
          </div>
          
          {/* Bar 2 (Highlight) */}
          <div className="flex-1 bg-slate-200 rounded-t-lg relative overflow-hidden" style={{ height: '75%' }}>
             <div className="absolute bottom-0 left-0 right-0 bg-brand-500 w-full h-full origin-bottom animate-[growBar_2s_ease-in-out_infinite] group-hover:animate-none group-hover:h-full transition-all duration-500"></div>
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">PROD</div>
             
             {/* Tooltip */}
             <div className="absolute top-2 right-1/2 translate-x-1/2 bg-ink-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                $2.4k
             </div>
          </div>

          {/* Bar 3 */}
          <div className="flex-1 bg-slate-200 rounded-t-lg relative overflow-hidden" style={{ height: '55%' }}>
             <div className="absolute bottom-0 left-0 right-0 bg-brand-300 w-full h-full origin-bottom animate-[growBar_2.5s_ease-in-out_infinite] group-hover:animate-none group-hover:h-full transition-all duration-500"></div>
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">MKTG</div>
          </div>
          
          {/* Budget Line */}
          <div className="absolute top-[30%] left-[-10%] right-[-10%] border-t border-dashed border-red-400 z-20 flex items-center opacity-60 group-hover:opacity-100 transition-opacity">
             <div className="bg-red-50 text-red-500 text-[9px] px-1 rounded font-bold border border-red-200 ml-2 -mt-2.5">CAP</div>
          </div>
      </div>
      
      {/* Floating Card */}
      <div className="absolute top-6 left-6 bg-white shadow-sm border border-slate-100 p-2 rounded-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
         <div className="p-1 bg-green-100 rounded text-green-600"><DollarSign size={12} /></div>
         <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold">Savings</span>
            <span className="text-xs font-bold text-ink-900">+18.5%</span>
         </div>
      </div>
  </div>
);

const PlatformVisual = () => (
  <div className="w-full h-full bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center p-8 group-hover:border-brand-200 transition-colors duration-500">
      <div className="relative w-full max-w-[320px] bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden font-mono text-[10px]">
         {/* Window Header */}
         <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-red-400"></div>
               <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
               <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-slate-400 ml-2">config.ts</div>
         </div>
         {/* Code Content */}
         <div className="p-4 space-y-2 text-slate-600">
             <div className="flex gap-2">
                <span className="text-purple-500">const</span>
                <span className="text-blue-500">ai</span>
                <span>=</span>
                <span className="text-yellow-600">new</span>
                <span className="text-ink-900">Overseer</span>({'{'}</div>
             <div className="pl-4 flex gap-2">
                <span className="text-slate-500">apiKey:</span>
                <span className="text-green-500">"ov_sk_..."</span>,
             </div>
             <div className="pl-4 flex gap-2 relative">
                <span className="text-slate-500">provider:</span>
                <span className="relative">
                   <span className="text-green-500">"auto"</span>
                   <div className="absolute -right-12 top-0 bg-brand-100 text-brand-700 px-1 rounded text-[8px] animate-pulse">Updated</div>
                </span>
             </div>
             <div className="pl-4 flex gap-2">
                <span className="text-slate-500">cache:</span>
                <span className="text-blue-500">true</span>
             </div>
             <div>{'}'});</div>
         </div>
         
         {/* Connection Lines (Decor) */}
         <div className="absolute top-[60%] right-4 w-12 h-px bg-slate-200"></div>
         <div className="absolute top-[60%] right-2 w-2 h-2 rounded-full bg-brand-500 animate-ping"></div>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl"></div>
  </div>
);

// --- Data ---

const extendedCases = [
  {
    id: 'cto',
    role: 'CTO / VP Engineering',
    icon: Shield,
    title: 'Govern AI usage without slowing down innovation.',
    description: "Eliminate Shadow AI risks. Gain complete visibility into every prompt, response, and dollar spent across your entire organization, regardless of the underlying model.",
    benefits: ["Prevent PII data exfiltration", "Unified audit trail for compliance", "Vendor-agnostic infrastructure"],
    Visual: CtoVisual
  },
  {
    id: 'finance',
    role: 'Head of Finance',
    icon: PieChart,
    title: 'Stop estimating. Start allocating with precision.',
    description: "Attribute AI costs to specific cost centers, teams, or features. Set hard budget caps and get alerted before you blow past your quarterly forecast.",
    benefits: ["Department-level budget enforcement", "Real-time spend anomaly alerts", "Consolidated billing for all providers"],
    Visual: FinanceVisual
  },
  {
    id: 'platform',
    role: 'Platform Architect',
    icon: Layout,
    title: 'The "One API" your developers actually want.',
    description: "Give your team a standardized, high-performance gateway. Switch models with a config change, not a code rewrite. Bake in caching and rate limiting by default.",
    benefits: ["Single SDK for OpenAI, Anthropic, & more", "Built-in semantic caching", "99.99% gateway uptime SLA"],
    Visual: PlatformVisual
  }
];

export const UseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const ActiveVisual = extendedCases[activeTab].Visual;

  return (
    <section id="use-cases" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
            Built for the entire org.
          </h2>
          <p className="text-slate-600 text-lg">
            Overseer bridges the gap between engineering velocity and enterprise control, solving critical pain points for every stakeholder.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Persona Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {extendedCases.map((c, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(idx)}
                  className={`
                    text-left px-6 py-5 rounded-xl transition-all duration-300 relative group border
                    ${isActive 
                      ? 'bg-brand-50 border-brand-200 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                     <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                        ${isActive ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'}
                     `}>
                        <c.icon size={20} strokeWidth={2} />
                     </div>
                     <div>
                        <span className={`text-sm font-bold uppercase tracking-wide block mb-0.5 ${isActive ? 'text-brand-700' : 'text-slate-500'}`}>
                           {c.role}
                        </span>
                        <span className={`text-base font-semibold ${isActive ? 'text-ink-900' : 'text-slate-700'}`}>
                           {c.id === 'cto' ? 'Governance & Security' : c.id === 'finance' ? 'Cost Control' : 'Developer Experience'}
                        </span>
                     </div>
                     {isActive && (
                        <div className="absolute right-4 text-brand-500">
                            <ChevronRight size={20} />
                        </div>
                     )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Content Card */}
          <div className="lg:col-span-8">
            <div className="bg-surface-subtle border border-slate-200 rounded-2xl p-1 shadow-xl shadow-slate-200/50 h-full min-h-[500px] flex flex-col">
               
               {/* Visual Area (Top/Right split in mobile/desktop) */}
               <div className="h-[280px] w-full rounded-xl overflow-hidden relative bg-white">
                  {/* Refined animation: slide in from left/right based on activeTab change */}
                  <div key={`visual-${activeTab}`} className="w-full h-full animate-fade-in-right">
                     <ActiveVisual />
                  </div>
               </div>

               {/* Text Content Area */}
               <div className="p-8 flex-grow flex flex-col justify-center">
                  <div key={`content-${activeTab}`} className="animate-fade-in-right">
                     <h3 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-4 leading-tight">
                        {extendedCases[activeTab].title}
                     </h3>
                     <p className="text-slate-600 text-lg leading-relaxed mb-8">
                        {extendedCases[activeTab].description}
                     </p>
                     
                     <div className="grid sm:grid-cols-2 gap-4">
                        {extendedCases[activeTab].benefits.map((benefit, i) => (
                           <div key={i} className="flex items-start gap-3">
                              <div className="mt-1 p-0.5 rounded-full bg-brand-100 text-brand-600">
                                 <CheckCircle2 size={14} strokeWidth={3} />
                              </div>
                              <span className="text-sm font-medium text-slate-700">{benefit}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
