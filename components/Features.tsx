import React from 'react';
import { 
  BadgeDollarSign,
  Gavel,
  LayoutDashboard,
  ShieldCheck,
  Fingerprint,
  Zap,
  Activity,
  Globe,
  Server,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Feature } from '../types';

// Custom Visual Components for each feature

// 1. Cost Attribution: Real-time budget tracking with threshold alerts
const CostVisual = () => (
  <div className="w-full h-full flex flex-col justify-end p-6 relative overflow-hidden group/cost">
    {/* Background Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] opacity-50"></div>
    
    {/* Budget Threshold Line */}
    <div className="absolute top-[35%] left-0 right-0 border-t border-dashed border-red-300 flex items-center z-10 opacity-0 group-hover/cost:opacity-100 transition-opacity duration-500">
       <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-r ml-0 shadow-sm transform -translate-y-1/2 flex items-center gap-1">
         <AlertTriangle size={8} /> Budget Cap
       </span>
    </div>

    <div className="flex justify-between items-end h-32 gap-1.5 relative z-0">
      {[35, 55, 45, 60, 85, 40, 75, 50, 65, 95].map((h, i) => {
          // Identify if this bar breaches the "Budget Cap" (approx > 65% height in this visual context)
          const isBreach = h > 65; 
          return (
            <div key={i} className="w-full bg-slate-100/50 rounded-t-[2px] relative overflow-hidden h-full flex items-end">
                <div 
                    className={`w-full rounded-t-[2px] transition-all duration-700 ease-out relative origin-bottom
                    ${isBreach ? 'bg-red-400 group-hover/cost:bg-red-500' : 'bg-brand-400 group-hover/cost:bg-brand-500'}
                    `}
                    style={{ 
                        height: `${h}%`,
                        opacity: 0.9,
                        animation: `growBar 3s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.2}s`
                    }}
                >
                    {/* Highlight top */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/50"></div>
                </div>
            </div>
          );
      })}
    </div>
    
    {/* Floating Spend Ticker */}
    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur shadow-lg shadow-slate-200/50 border border-slate-100 rounded-lg p-2.5 flex flex-col items-start gap-1 transform transition-all duration-500 group-hover/cost:scale-105 group-hover/cost:border-brand-100">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Real-time Spend
        </div>
        <div className="text-sm font-bold text-ink-900 font-mono flex items-center gap-2">
            $1,240.50 
            <span className="text-[10px] text-red-500 bg-red-50 px-1 rounded flex items-center">
                <TrendingUp size={10} className="mr-0.5" /> +12%
            </span>
        </div>
    </div>
  </div>
);

// 2. Governance: Visualizing a filter/gatekeeper for prompts
const GovernanceVisual = () => (
  <div className="w-full h-full flex flex-col justify-center px-6 gap-2.5">
    {/* Allowed Item */}
    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm opacity-60 group-hover:opacity-100 transition-all duration-500">
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <div className="h-1.5 w-16 bg-slate-200 rounded-full"></div>
        </div>
        <CheckCircle2 size={14} className="text-green-500" />
    </div>

    {/* Blocked Item (Animates in) */}
    <div className="flex items-center justify-between bg-red-50 p-2.5 rounded-lg border border-red-100 shadow-sm transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
            <div className="h-1.5 w-24 bg-red-200 rounded-full"></div>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-white px-1.5 py-0.5 rounded border border-red-100 shadow-sm">
            <Gavel size={10} />
            BLOCKED
        </div>
    </div>

    {/* Allowed Item */}
    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm opacity-60 group-hover:opacity-100 transition-all duration-500 delay-200">
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <div className="h-1.5 w-12 bg-slate-200 rounded-full"></div>
        </div>
        <CheckCircle2 size={14} className="text-green-500" />
    </div>
  </div>
);

// 3. Observability: Stacked metric cards with scanning effect
const ObservabilityVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-slate-50/30 overflow-hidden px-6 py-4 gap-3">
        {/* Background decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

        {/* Stacked Metric Cards */}
        {[
            { label: "REQUESTS", value: "2,405/s", color: "text-brand-600", bg: "bg-brand-500", trend: "up" },
            { label: "AVG LATENCY", value: "124ms", color: "text-blue-600", bg: "bg-blue-500", trend: "stable" },
            { label: "ERROR RATE", value: "0.01%", color: "text-green-600", bg: "bg-green-500", trend: "down" }
        ].map((metric, i) => (
             <div key={i} className="w-full bg-white border border-slate-100 shadow-sm rounded-lg p-2 flex items-center justify-between relative overflow-hidden group/item hover:border-slate-300 transition-colors z-10">
                 {/* Live Graph Background inside card */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                     <div className={`w-full h-full ${metric.bg} animate-pulse`}></div>
                 </div>

                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${metric.bg} ${metric.trend === 'up' ? 'animate-pulse' : ''}`}></div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider">{metric.label}</span>
                 </div>
                 
                 <div className="flex items-center gap-2">
                     {/* Mini Sparkline */}
                     <div className="flex items-end gap-[1px] h-4 w-12 opacity-50">
                         {[...Array(8)].map((_, j) => (
                             <div key={j} className={`w-1 rounded-t-[1px] ${metric.bg}`} style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                         ))}
                     </div>
                     <span className={`text-xs font-mono font-bold ${metric.color}`}>{metric.value}</span>
                 </div>
             </div>
        ))}

        {/* Scanning Laser Vertical Line Overlay */}
        <div className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-brand-500/50 to-transparent left-[-20%] animate-[sweep_4s_ease-in-out_infinite] z-20 pointer-events-none blur-[1px]"></div>
    </div>
);

// 4. Security: Shield with scanning sheen effect
const SecurityVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    {/* Radial Glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <div className="relative">
        <ShieldCheck className="text-slate-300 group-hover:text-brand-500 transition-colors duration-500" size={56} strokeWidth={1.5} />
        
        {/* Scanning sheen overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden mix-blend-overlay">
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ backgroundSize: '200% 100%', animationDuration: '1.5s' }}></div>
        </div>
    </div>
    
    {/* Status Dots */}
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-brand-500 transition-colors delay-0"></div>
        <div className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-brand-500 transition-colors delay-75"></div>
        <div className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-brand-500 transition-colors delay-150"></div>
    </div>
  </div>
);

// 5. Guardrails: Text redaction process
const GuardrailsVisual = () => (
  <div className="w-full h-full flex flex-col justify-center px-8 gap-4 font-mono text-xs">
    <div className="flex gap-2 text-slate-400 items-center">
      <span className="text-[10px] uppercase tracking-wider text-slate-300">Input</span>
      <span className="text-slate-600">My SSN is <span className="text-ink-900 font-bold border-b border-red-200">999-00-1234</span></span>
    </div>
    
    {/* Processing Divider */}
    <div className="h-px w-full bg-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-500 w-1/3 -translate-x-full group-hover:animate-slide-right" style={{ animationDuration: '1.2s' }}></div>
    </div>

    <div className="flex gap-2 text-slate-400 items-center">
      <span className="text-[10px] uppercase tracking-wider text-slate-300">Output</span>
      <span className="text-slate-600">My SSN is <span className="bg-slate-100 text-slate-400 rounded px-1.5 py-0.5 group-hover:bg-slate-800 group-hover:text-transparent transition-all duration-300 delay-300 select-none">[REDACTED]</span></span>
    </div>
  </div>
);

// 6. Routing: Comparison of Standard vs Overseer lanes
const RoutingVisual = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden px-6 bg-slate-50/50">
    
    {/* Slow Lane */}
    <div className="w-full flex items-center gap-3 opacity-40 grayscale transition-all duration-500 group-hover:opacity-30">
       <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center shrink-0">
          <Globe size={12} className="text-slate-500"/>
       </div>
       <div className="flex-1 h-[1px] bg-slate-200 relative overflow-hidden">
          <div className="absolute top-0 bottom-0 w-8 bg-slate-400/50 -translate-x-full animate-slide-right" style={{ animationDuration: '3s' }}></div>
       </div>
       <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center shrink-0">
          <Server size={12} className="text-slate-500"/>
       </div>
    </div>

    {/* Fast Lane (Overseer) */}
    <div className="w-full flex items-center gap-3 relative z-10 transition-transform duration-500 group-hover:scale-105">
       <div className="w-6 h-6 rounded bg-brand-50 border border-brand-200 flex items-center justify-center shadow-sm shrink-0">
          <Zap size={12} className="text-brand-500 fill-brand-500"/>
       </div>
       <div className="flex-1 h-[2px] bg-brand-100 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500 to-transparent w-2/3 -translate-x-full animate-slide-right" style={{ animationDuration: '0.8s' }}></div>
       </div>
       <div className="w-6 h-6 rounded bg-brand-50 border border-brand-200 flex items-center justify-center shadow-sm shrink-0 relative">
          <Activity size={12} className="text-brand-500"/>
          <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping" style={{ animationDuration: '0.8s' }}></div>
       </div>
    </div>
  </div>
);

const features: Feature[] = [
  {
    title: "Real-time Cost Attribution",
    description: "Know exactly which team, project, or feature is driving up your AI bill. Eliminate end-of-month surprises with budget alerts.",
    icon: BadgeDollarSign,
    colSpan: 2,
  },
  {
    title: "Unified Governance Policy",
    description: "Enforce global rules: 'No GPT-4 for dev environments' or 'Block prompts containing PII' across all providers.",
    icon: Gavel,
    colSpan: 1,
  },
  {
    title: "Centralized Observability",
    description: "A single pane of glass for all AI traffic. Debug failures, latency, and token usage without jumping between provider dashboards.",
    icon: LayoutDashboard,
    colSpan: 1,
  },
  {
    title: "Enterprise Security",
    description: "SSO enforcement, audit logs, and private VPC deployment options. SOC2 Type II ready.",
    icon: ShieldCheck,
    colSpan: 2,
  },
  {
    title: "Data Guardrails",
    description: "Automatically detect and redact sensitive data (PII/PHI) before it leaves your infrastructure.",
    icon: Fingerprint,
    colSpan: 1,
  },
  {
    title: "Zero-Latency Routing",
    description: "Smart fallback routing ensures uptime even when providers are down. Lowest latency guarantees.",
    icon: Zap,
    colSpan: 2,
  },
];

const FeatureVisualContainer = ({ index }: { index: number }) => {
  const visuals = [
    CostVisual,
    GovernanceVisual,
    ObservabilityVisual,
    SecurityVisual,
    GuardrailsVisual,
    RoutingVisual
  ];
  const Visual = visuals[index] || CostVisual;

  return (
    <div className="w-full h-32 mb-6 bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden relative group-hover:border-brand-200/50 transition-colors">
      <Visual />
    </div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-surface-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
            Total control over your AI stack.
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl">
            Overseer acts as the intelligent layer between your organization and AI providers, giving you the control typically reserved for Big Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`
                group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden
                ${feature.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}
              `}
            >
              <FeatureVisualContainer index={idx} />
              
              <div className="flex items-center gap-3 mb-3">
                 <div className="p-2 bg-brand-50 rounded-lg text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <feature.icon size={20} strokeWidth={2.5} />
                 </div>
                 <h3 className="text-xl font-display font-bold text-ink-900">
                    {feature.title}
                </h3>
              </div>
              
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
