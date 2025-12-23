'use client';

import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Terminal,
  Users,
  Database,
  Server,
  Globe,
  Cpu,
} from "lucide-react";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

// ViewBox 600x450 (cleaner + simpler topology)
const PATHS = {
  in0: "M 70 110 C 190 110, 200 225, 275 225",
  in1: "M 70 225 C 190 225, 205 225, 275 225",
  in2: "M 70 340 C 190 340, 200 225, 275 225",
  out0: "M 325 225 C 400 225, 420 110, 530 110",
  out1: "M 325 225 C 410 225, 430 225, 530 225",
  out2: "M 325 225 C 400 225, 420 340, 530 340",
};

type Step =
  | { id: 0; srcIdx: 0; dstIdx: 0; blocked: false; inPath: string; outPath: string }
  | { id: 1; srcIdx: 1; dstIdx: 1; blocked: false; inPath: string; outPath: string }
  | { id: 2; srcIdx: 2; dstIdx: 2; blocked: true; inPath: string; outPath: string };

export const Hero: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // cleaner pacing
    const t = setInterval(() => setStep((p) => ((p + 1) % 3) as 0 | 1 | 2), 4200);
    return () => clearInterval(t);
  }, []);

  const STEPS: Step[] = useMemo(
    () => [
      { id: 0, srcIdx: 0, dstIdx: 0, blocked: false, inPath: PATHS.in0, outPath: PATHS.out0 },
      { id: 1, srcIdx: 1, dstIdx: 1, blocked: false, inPath: PATHS.in1, outPath: PATHS.out1 },
      { id: 2, srcIdx: 2, dstIdx: 2, blocked: true, inPath: PATHS.in2, outPath: PATHS.out2 },
    ],
    []
  );

  const active = STEPS[step];

  const Node = ({
    label,
    Icon,
    active,
    blocked,
    align = "right",
  }: {
    label: string;
    Icon: React.ElementType;
    active?: boolean;
    blocked?: boolean;
    align?: "left" | "right";
  }) => {
    return (
      <div
        className={[
          "flex items-center gap-4 transition-all duration-500",
          active ? "opacity-100 scale-105" : "opacity-40 scale-100",
          align === "right" ? "justify-end" : "justify-start",
        ].join(" ")}
      >
        {align === "left" && (
          <div
            className={[
              "h-14 w-14 rounded-2xl border flex items-center justify-center shadow-sm transition-colors duration-500 relative z-10",
              blocked
                ? "border-red-200 text-red-500 bg-red-50"
                : active
                ? "border-brand-200 text-brand-600 bg-white shadow-brand-500/10"
                : "border-slate-200 text-slate-400 bg-white",
            ].join(" ")}
          >
            <Icon size={24} strokeWidth={1.5} />
          </div>
        )}

        <span
          className={[
            "text-sm font-bold tracking-wide transition-colors duration-500",
            active ? "text-slate-800" : "text-slate-400",
          ].join(" ")}
        >
          {label}
        </span>

        {align === "right" && (
          <div
            className={[
              "h-14 w-14 rounded-2xl border flex items-center justify-center bg-white shadow-sm transition-colors duration-500 relative z-10",
              active ? "border-brand-200 text-brand-600 shadow-brand-500/10" : "border-slate-200 text-slate-400",
            ].join(" ")}
          >
            <Icon size={24} strokeWidth={1.5} />
          </div>
        )}
      </div>
    );
  };

  // minimal dot
  const FlowDot = ({
    path,
    begin,
    dur,
    color,
  }: {
    path: string;
    begin: string;
    dur: string;
    color: string;
  }) => {
    if (prefersReducedMotion) return null;
    return (
      <circle r="4" fill={color} filter="url(#glow)">
        <animateMotion
          path={path}
          begin={begin}
          dur={dur}
          repeatCount="1"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.42 0 0.58 1"
        />
        <animate
          attributeName="opacity"
          begin={begin}
          dur={dur}
          values="0;1;1;0"
          keyTimes="0;0.1;0.9;1"
        />
      </circle>
    );
  };

  // Draw-on stroke
  const ActivePath = ({
    d,
    begin,
    dur,
    blocked,
  }: {
    d: string;
    begin: string;
    dur: string;
    blocked?: boolean;
  }) => {
    if (prefersReducedMotion) return null;
    return (
      <path
        d={d}
        fill="none"
        stroke={blocked ? "#ef4444" : "#f97316"}
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        filter="url(#glow)"
      >
        <animate
          attributeName="stroke-dasharray"
          begin={begin}
          dur={dur}
          values="0 100;100 100" // Fully draw then stay
          fill="freeze"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.42 0 0.58 1"
        />
        <animate
          attributeName="opacity"
          begin={begin}
          dur={dur}
          values="0;0.8;0"
          keyTimes="0;0.1;1"
        />
      </path>
    );
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50/50">
      {/* Minimal Background (Clean) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium tracking-wide mb-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Enterprise Control Plane
            </div>

            <h1 className="text-5xl lg:text-6xl font-display font-bold text-ink-900 leading-[1.1] tracking-tight">
              Govern your AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">
                infrastructure.
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              A unified gateway for all LLM traffic. Enforce policy, manage spend,
              and gain complete observability without slowing down development.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-all shadow-sm flex items-center justify-center gap-2 group">
                Start Integration
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-slate-700 font-medium hover:bg-white hover:border-slate-300 transition-all border border-slate-200 bg-transparent">
                Read the Docs
              </button>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-xs text-slate-500 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-500"></div> SOC2 Type II
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-500"></div> 99.99% Uptime
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-500"></div> &lt; 5ms Latency
              </span>
            </div>
          </div>

          {/* Clean + Simple Gateway Animation */}
          <div className="relative h-[540px] w-full hidden lg:flex items-center justify-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {/* Removed the background Card container div */}
            <div className="relative w-full h-full max-w-[720px] grid grid-cols-[1fr_auto_1fr] items-center">
              
              {/* Left: Sources */}
              <div className="flex flex-col h-[320px] justify-between py-6 items-end pr-8 z-20">
                <Node label="Engineering" Icon={Terminal} active={active.srcIdx === 0} align="right" />
                <Node label="Product" Icon={Users} active={active.srcIdx === 1} align="right" />
                <Node label="Finance" Icon={Database} active={active.srcIdx === 2} align="right" />
              </div>

              {/* Center: Gateway */}
              <div className="relative z-30 flex items-center justify-center w-56">
                {/* Gateway Core */}
                <div className="relative">
                  {/* Ripples */}
                  <div className="absolute inset-0 bg-brand-500/20 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-[-16px] bg-brand-500/10 rounded-full animate-pulse"></div>
                  
                  {/* Main Orb */}
                  <div
                    className={[
                      "w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center relative z-10",
                      "border-2 border-slate-100 shadow-xl shadow-brand-500/10",
                    ].join(" ")}
                  >
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 w-full h-full rounded-full flex items-center justify-center">
                       <Cpu size={48} strokeWidth={1.5} className="text-brand-600" />
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-wider text-slate-500 uppercase shadow-sm">
                      Gateway
                    </span>
                  </div>
                </div>

                {/* Minimal blocked indicator */}
                {!prefersReducedMotion && active.blocked && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-32 h-32 rounded-full border-2 border-red-400 opacity-50 animate-[ping_1s_ease-out_infinite]" />
                  </div>
                )}
              </div>

              {/* Right: Providers */}
              <div className="flex flex-col h-[320px] justify-between py-6 items-start pl-8 z-20">
                <Node label="OpenAI" Icon={Globe} active={!active.blocked && active.dstIdx === 0} align="left" />
                <Node label="Anthropic" Icon={Globe} active={!active.blocked && active.dstIdx === 1} align="left" />
                <Node label="Google" Icon={Globe} active={active.dstIdx === 2} blocked={active.blocked} align="left" />
              </div>

              {/* SVG Topology */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 600 450">
                <defs>
                   <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                   </filter>
                   <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
                   </linearGradient>
                </defs>

                {/* Animated Static lines (Idle state) */}
                <g>
                  {Object.values(PATHS).map((d, idx) => (
                    <path 
                      key={idx} 
                      d={d} 
                      stroke="#cbd5e1" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                    >
                       {/* Subtle flow animation for static lines */}
                       <animate 
                          attributeName="stroke-dashoffset" 
                          from="100" 
                          to="0" 
                          dur={`${15 + idx}s`} 
                          repeatCount="indefinite" 
                          calcMode="linear"
                       />
                    </path>
                  ))}
                </g>

                {/* Active IN */}
                <ActivePath d={active.inPath} begin="0s" dur="1.2s" blocked={active.blocked} />
                <FlowDot
                  path={active.inPath}
                  begin="0s"
                  dur="1.2s"
                  color={active.blocked ? "#ef4444" : "#f97316"}
                />

                {/* Active OUT (skip when blocked) */}
                {!active.blocked && (
                  <>
                    <ActivePath d={active.outPath} begin="1.15s" dur="1.15s" />
                    <FlowDot path={active.outPath} begin="1.15s" dur="1.15s" color="#f97316" />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};