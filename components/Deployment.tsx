import React from 'react';
import { Shield, Lock, FileCheck, Server, CheckCircle, Globe, Fingerprint, Database, Cpu, ShieldCheck } from 'lucide-react';

// --- Meaningful Micro-Animations ---

const ComplianceVisual = () => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden bg-emerald-50/30 rounded-xl border border-emerald-100/50 mb-6 group">
    {/* Ambient Glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <div className="relative flex items-center justify-center">
      {/* Outer Rotating Ring */}
      <div className="absolute w-20 h-20 border border-emerald-200/50 rounded-full border-dashed animate-[spin_8s_linear_infinite]"></div>
      
      {/* Secondary Pulse Ring */}
      <div className="absolute w-16 h-16 border border-emerald-400/20 rounded-full animate-pulse"></div>

      {/* Main Shield Icon */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative transform group-hover:scale-110 transition-transform duration-500">
          <ShieldCheck size={42} className="text-emerald-500" strokeWidth={1.5} />
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-emerald-400/30 blur-2xl animate-pulse -z-10"></div>
        </div>
      </div>

      {/* Verified Nodes (Floating around the shield) */}
      {[...Array(4)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000"
          style={{
            top: `${50 + 35 * Math.sin((i * 90 * Math.PI) / 180)}%`,
            left: `${50 + 35 * Math.cos((i * 90 * Math.PI) / 180)}%`,
            animation: `pulse 2s infinite ${i * 0.5}s`,
            opacity: 0.8
          }}
        ></div>
      ))}
    </div>

    {/* Advanced Laser Scan Line */}
    <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent top-[-50px] animate-[scan_4s_ease-in-out_infinite] pointer-events-none">
       <div className="w-full h-[1px] bg-emerald-400/60 shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
    </div>

    {/* "SECURED" Badge that fades in on hover */}
    <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
      <CheckCircle size={10} className="text-emerald-500" />
      <span className="text-[8px] font-mono font-bold text-emerald-600 uppercase tracking-widest">Verified Type II</span>
    </div>
  </div>
);

const IdentityVisual = () => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden bg-brand-50/30 rounded-xl border border-brand-100/50 mb-6 group">
    <div className="flex items-center gap-4 relative z-10">
      <div className="w-10 h-10 rounded-lg bg-white border border-brand-100 shadow-sm flex items-center justify-center text-brand-500">
        <Fingerprint size={20} />
      </div>
      <div className="h-0.5 w-12 bg-slate-200 relative overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-brand-500 w-1/2 -translate-x-full animate-slide-right"></div>
      </div>
      <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
        <Lock size={18} />
      </div>
    </div>
    {/* Background particles */}
    <div className="absolute inset-0 opacity-20">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-1 h-1 bg-brand-400 rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }}
        ></div>
      ))}
    </div>
  </div>
);

const IsolationVisual = () => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden bg-indigo-50/30 rounded-xl border border-indigo-100/50 mb-6">
    <div className="relative w-16 h-16">
      {/* Outer Circle (The VPC Wall) */}
      <div className="absolute inset-0 border border-indigo-200 border-dashed rounded-full animate-[spin_10s_linear_infinite]"></div>
      {/* Inner Protected Nodes */}
      <div className="absolute inset-4 bg-white rounded-full border border-indigo-100 shadow-inner flex items-center justify-center">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse delay-150"></div>
          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-2 right-4 flex items-center gap-1 opacity-60">
      <Globe size={10} className="text-indigo-400" />
      <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">Isolated Network</span>
    </div>
  </div>
);

const TransparencyVisual = () => (
  <div className="relative w-full h-24 flex flex-col justify-end p-4 overflow-hidden bg-slate-900 rounded-xl border border-slate-800 mb-6 font-mono text-[9px]">
    <div className="space-y-1.5 opacity-80">
      <div className="flex gap-2 items-center text-slate-400 animate-fade-in-up" style={{ animationDelay: '0s' }}>
        <span className="text-emerald-400 font-bold">200</span>
        <span>POST</span>
        <span className="truncate text-slate-500">/v1/chat/completions</span>
      </div>
      <div className="flex gap-2 items-center text-slate-400 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <span className="text-brand-400 font-bold">403</span>
        <span>POST</span>
        <span className="truncate text-slate-500">/v1/moderations [BLOCKED]</span>
      </div>
      <div className="flex gap-2 items-center text-slate-400 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <span className="text-emerald-400 font-bold">200</span>
        <span>GET</span>
        <span className="truncate text-slate-500">/v1/models</span>
      </div>
    </div>
    {/* Cursor */}
    <div className="w-1.5 h-3 bg-brand-500 mt-1 animate-blink"></div>
  </div>
);

export const Deployment: React.FC = () => {
  return (
    <section id="enterprise" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      
      {/* Soft Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              Enterprise Control Plane
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink-900 leading-[1.1] tracking-tight">
              Enterprise Grade. <br />
              <span className="text-brand-500">
                Security by Default.
              </span>
            </h2>
            
            <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
              AI infrastructure is now mission-critical. Overseer provides the SOC2 compliant, high-availability layer required to move from prototype to production at scale.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 group-hover:border-brand-500/50 group-hover:bg-brand-50 transition-all">
                        <Shield size={24} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                    </div>
                    <div>
                        <h4 className="font-bold text-ink-900 mb-1">Zero-trust Proxy</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Identity-aware routing for every internal AI request.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 group-hover:border-indigo-500/50 group-hover:bg-indigo-50 transition-all">
                        <Database size={24} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <div>
                        <h4 className="font-bold text-ink-900 mb-1">Data Sovereignty</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Regional routing guarantees for strict GDPR/HIPAA compliance.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
               <button className="bg-ink-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group">
                 Book Enterprise Demo
                 <CheckCircle size={18} className="group-hover:scale-110 transition-transform" />
               </button>
               <button className="px-8 py-4 rounded-xl font-bold border border-slate-200 hover:border-slate-300 hover:bg-white transition-all text-slate-700">
                 View Security Whitepaper
               </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: SOC2 */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 group">
              <ComplianceVisual />
              <h3 className="font-bold text-xl mb-2 text-ink-900">SOC2 Type II</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Audited systems and processes ensuring your model traffic is handled with industry-standard rigor.
              </p>
            </div>
            
            {/* Card 2: SSO */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300 group">
              <IdentityVisual />
              <h3 className="font-bold text-xl mb-2 text-ink-900">Enterprise SSO</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Connect your IdP (Okta, Azure, Google) to enforce RBAC and MFA for all developers and keys.
              </p>
            </div>

            {/* Card 3: Private VPC */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 group">
              <IsolationVisual />
              <h3 className="font-bold text-xl mb-2 text-ink-900">Private VPC</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Deploy Overseer inside your own AWS/GCP VPC for absolute network isolation and zero public exposure.
              </p>
            </div>

            {/* Card 4: Audit Logs */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300 group">
              <TransparencyVisual />
              <h3 className="font-bold text-xl mb-2 text-ink-900">Audit Trails</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Immutable, high-resolution logs of every request, response, and policy decision in real-time.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};