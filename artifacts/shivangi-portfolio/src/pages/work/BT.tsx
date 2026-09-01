import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import {
  Brain, Zap, Users, TrendingUp, Bot, MessageSquare, Shield, CheckCircle,
  Sparkles, Clock, ArrowRight, Target, Layers, BarChart2,
  AlertTriangle, Globe, Star, RefreshCw, UserCheck, Lightbulb,
  Search, BookOpen,
} from "lucide-react";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg:        "#f7f5ff",
  bgDeep:    "#f0ebff",
  surface:   "#ffffff",
  surfaceAlt:"#faf8ff",
  border:    "rgba(109,40,217,0.12)",
  borderMed: "rgba(109,40,217,0.2)",
  text:      "#1a0a2e",
  textMid:   "#4a3670",
  textMuted: "#7b6aa0",
  purple:    "#6d28d9",
  purpleLight:"#7c3aed",
  accent:    "#9333ea",
  accentSoft:"rgba(109,40,217,0.1)",
  accentMid: "rgba(109,40,217,0.18)",
  accentBorder:"rgba(109,40,217,0.25)",
  redSoft:   "rgba(220,38,38,0.08)",
  redBorder: "rgba(220,38,38,0.18)",
  redText:   "#991b1b",
  redLight:  "#dc2626",
  greenSoft: "rgba(22,163,74,0.1)",
  greenBorder:"rgba(22,163,74,0.2)",
  greenText: "#15803d",
  yellowSoft:"rgba(202,138,4,0.1)",
  yellowBorder:"rgba(202,138,4,0.25)",
  yellowText:"#92400e",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: "overview",    label: "Overview"    },
  { id: "challenge",   label: "Challenge"   },
  { id: "discovery",   label: "Discovery"   },
  { id: "ai-research", label: "AI Research" },
  { id: "strategy",    label: "Strategy"    },
  { id: "design",      label: "Design"      },
  { id: "prototype",   label: "Prototype"   },
  { id: "impact",      label: "Impact"      },
  { id: "reflection",  label: "Reflection"  },
];

const resolutionData = [
  { month: "Apr", rate: 28, calls: 94 },
  { month: "May", rate: 33, calls: 88 },
  { month: "Jun", rate: 39, calls: 81 },
  { month: "Jul", rate: 44, calls: 75 },
  { month: "Aug", rate: 51, calls: 68 },
  { month: "Sep", rate: 58, calls: 60 },
  { month: "Oct", rate: 64, calls: 52 },
  { month: "Nov", rate: 71, calls: 44 },
];

const competitors = [
  { name: "My Vodafone", color: "#dc2626", aiScore: 4, selfService: 8, onboarding: 6, strength: "Strong self-service",      weakness: "Escalates too quickly"       },
  { name: "My O2",       color: "#2563eb", aiScore: 5, selfService: 7, onboarding: 8, strength: "Clean biometric login",    weakness: "Chat feels disconnected"     },
  { name: "EE App",      color: "#16a34a", aiScore: 5, selfService: 9, onboarding: 7, strength: "Broadband + device mgmt", weakness: "Repetitive loops"            },
  { name: "Three UK",    color: "#ea580c", aiScore: 3, selfService: 6, onboarding: 6, strength: "Minimal layout",          weakness: "No intelligent chatbot"      },
  { name: "Sky Mobile",  color: "#0369a1", aiScore: 2, selfService: 5, onboarding: 7, strength: "Friendly tone",           weakness: "No smart support journey"    },
];

const kpis = [
  { label: "Resolution Rate",      before: "31%",    after: "71%",    delta: "+129%", icon: CheckCircle, color: C.purple      },
  { label: "Avg. Resolution Time", before: "12 min", after: "3.2 min",delta: "−73%",  icon: Clock,       color: C.purpleLight },
  { label: "Escalation Rate",      before: "68%",    after: "29%",    delta: "−57%",  icon: UserCheck,   color: "#7c3aed"     },
  { label: "CSAT",                 before: "3.1/5",  after: "4.4/5",  delta: "+42%",  icon: Star,        color: C.accent      },
];

// ─── Primitives ─────────────────────────────────────────────────────────────
function ScoreBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.bgDeep }}>
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-mono w-4" style={{ color: C.textMuted }}>{value}</span>
    </div>
  );
}

function AIBadge({ label = "AI Insight" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
      style={{ background: C.yellowSoft, color: C.yellowText, border: `1px solid ${C.yellowBorder}` }}>
      <Brain size={10} />{label}
    </span>
  );
}

function HumanBadge({ label = "Human Decision" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
      style={{ background: C.accentMid, color: C.purple, border: `1px solid ${C.accentBorder}` }}>
      <Lightbulb size={10} />{label}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-xs font-mono tracking-widest uppercase mb-4"
      style={{ color: C.purpleLight, letterSpacing: "0.18em" }}>{children}</span>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border p-6 ${className}`}
      style={{ background: C.surface, borderColor: C.border, boxShadow: "0 1px 6px rgba(109,40,217,0.06)" }}>
      {children}
    </div>
  );
}

function SectionWrapper({ id, children, className = "", style }: { id: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <section id={id} className={`py-24 px-6 md:px-16 max-w-7xl mx-auto ${className}`} style={style}>
      {children}
    </section>
  );
}

function AnimatedNodes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(7)].map((_, i) => (
        <div key={`node-${i}`} className="absolute rounded-full"
          style={{
            width: `${6 + (i % 3) * 4}px`, height: `${6 + (i % 3) * 4}px`,
            background: i % 2 === 0 ? "#a78bfa" : "#c4b5fd",
            left: `${10 + i * 13}%`, top: `${20 + (i % 4) * 18}%`,
            boxShadow: `0 0 ${12 + i * 4}px ${i % 2 === 0 ? "#a78bfa" : "#c4b5fd"}60`,
            animation: `btFloatNode ${3 + i * 0.7}s ease-in-out ${i * 0.4}s infinite alternate`,
            opacity: 0.5,
          }} />
      ))}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        {[[10,30,23,38],[23,38,36,56],[36,56,49,44],[49,44,62,62],[62,62,75,50],[75,50,88,68]].map(([x1,y1,x2,y2], i) => (
          <line key={`ln-${i}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
            stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 6" />
        ))}
      </svg>
    </div>
  );
}

// ─── SVG Charts ──────────────────────────────────────────────────────────────
const CW = 400, CH = 150, CP = { t: 10, r: 10, b: 28, l: 34 };
const IW = CW - CP.l - CP.r, IH = CH - CP.t - CP.b;
const TICKS = [0, 25, 50, 75, 100];

function AreaChart() {
  const pts = resolutionData.map((d, i) => ({
    x: CP.l + (i / (resolutionData.length - 1)) * IW,
    y: CP.t + IH - (d.rate / 100) * IH,
    label: d.month,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length-1].x.toFixed(1)},${(CP.t+IH).toFixed(1)} L${pts[0].x.toFixed(1)},${(CP.t+IH).toFixed(1)} Z`;
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full">
      <defs>
        <linearGradient id="areaGradBT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      {TICKS.map(v => {
        const gy = CP.t + IH - (v / 100) * IH;
        return (
          <g key={`ag-${v}`}>
            <line x1={CP.l} y1={gy} x2={CW - CP.r} y2={gy} stroke="rgba(109,40,217,0.08)" strokeWidth="1" />
            <text x={CP.l - 4} y={gy + 4} textAnchor="end" fill={C.textMuted} fontSize="10" fontFamily="monospace">{v}</text>
          </g>
        );
      })}
      {pts.map(p => (
        <text key={`al-${p.label}`} x={p.x} y={CH - 6} textAnchor="middle" fill={C.textMuted} fontSize="10" fontFamily="monospace">{p.label}</text>
      ))}
      <path d={areaPath} fill="url(#areaGradBT)" />
      <path d={linePath} fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
      {pts.map(p => <circle key={`ad-${p.label}`} cx={p.x} cy={p.y} r="3" fill="#7c3aed" />)}
    </svg>
  );
}

function BarChart() {
  const bW = (IW / resolutionData.length) * 0.55;
  const gap = IW / resolutionData.length;
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full">
      {TICKS.map(v => {
        const gy = CP.t + IH - (v / 100) * IH;
        return (
          <g key={`bg-${v}`}>
            <line x1={CP.l} y1={gy} x2={CW - CP.r} y2={gy} stroke="rgba(109,40,217,0.08)" strokeWidth="1" />
            <text x={CP.l - 4} y={gy + 4} textAnchor="end" fill={C.textMuted} fontSize="10" fontFamily="monospace">{v}</text>
          </g>
        );
      })}
      {resolutionData.map((d, i) => {
        const bh = (d.calls / 100) * IH;
        const bx = CP.l + i * gap + (gap - bW) / 2;
        const by = CP.t + IH - bh;
        return (
          <g key={`bb-${d.month}`}>
            <rect x={bx} y={by} width={bW} height={bh} rx="3" fill="#c4b5fd" />
            <text x={bx + bW / 2} y={CH - 6} textAnchor="middle" fill={C.textMuted} fontSize="10" fontFamily="monospace">{d.month}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
// Maps each scrolled section id → which tab should be active
const SECTION_TO_TAB: Record<string, string> = {
  overview:    "problem",
  challenge:   "problem",
  discovery:   "discovery",
  "ai-research": "discovery",
  strategy:    "solution",
  design:      "solution",
  prototype:   "solution",
  impact:      "impact",
  reflection:  "impact",
};

const TABS = [
  { id: "problem",   label: "Problem",   scrollTo: "overview"  },
  { id: "discovery", label: "Discovery", scrollTo: "discovery" },
  { id: "solution",  label: "Solution",  scrollTo: "strategy"  },
  { id: "impact",    label: "Impact",    scrollTo: "impact"    },
];

function StickyNav({ active }: { active: string }) {
  const activeTab = SECTION_TO_TAB[active] ?? "problem";

  const scrollTo = (sectionId: string) =>
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav className="sticky top-0 z-50 border-b"
      style={{ background: "rgba(247,245,255,0.95)", backdropFilter: "blur(20px)", borderColor: C.border }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <div className="hidden sm:flex items-center gap-2 py-3 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: `linear-gradient(135deg,${C.purple},${C.accent})` }}>BT</div>
          <span className="text-xs font-mono hidden sm:block" style={{ color: C.textMuted }}>AI Chatbot Redesign</span>
        </div>

        {/* 4 Tabs */}
        <div className="flex items-stretch justify-between w-full sm:w-auto">
          {TABS.map((tab, i) => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => scrollTo(tab.scrollTo)}
                className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-6 py-4 text-xs sm:text-sm font-medium transition-colors"
                style={{ fontFamily: "Inter, sans-serif", color: isActive ? C.purple : C.textMuted }}>
                <span className="text-xs font-mono"
                  style={{ color: isActive ? C.purpleLight : "rgba(109,40,217,0.3)" }}>
                  0{i + 1}
                </span>
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-t-full"
                    style={{ background: `linear-gradient(to right,${C.purple},${C.accent})` }} />
                )}
              </button>
            );
          })}
        </div>

        <div className="w-28 hidden sm:block" />
      </div>
    </nav>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: `linear-gradient(160deg, #ede9fe 0%, #f7f5ff 40%, #faf8ff 100%)` }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle,#c4b5fd,transparent)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle,#ddd6fe,transparent)" }} />
      </div>
      <AnimatedNodes />

      <div className="relative z-10 px-8 md:px-20 pt-24 pb-16 max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
            style={{ background: C.accentMid, color: C.purple, border: `1px solid ${C.accentBorder}` }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.purple }} />
            Case Study · 2024
          </span>
          <span className="text-xs font-mono" style={{ color: C.textMuted }}>British Telecom × AI × UX</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
          Redesigning<br />
          <span className="italic font-light" style={{ color: C.purpleLight }}>customer support</span><br />
          with AI.
        </h1>

        <p className="text-lg max-w-xl mb-10 leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
          8 months transforming BT's "Need Help" chatbot from a dead-end into an intelligent self-service experience.
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          {[
            { label: "Role",     value: "Senior Product Designer" },
            { label: "Duration", value: "Apr – Nov 2024"          },
            { label: "Platform", value: "Sprinklr · Web · Mobile" },
            { label: "Team",     value: "10 People"               },
          ].map(chip => (
            <div key={chip.label} className="px-4 py-2 rounded-xl border"
              style={{ borderColor: C.border, background: C.surface, boxShadow: "0 1px 4px rgba(109,40,217,0.07)" }}>
              <span className="text-xs font-mono block" style={{ color: C.textMuted }}>{chip.label}</span>
              <span className="text-sm font-medium" style={{ color: C.text, fontFamily: "Inter, sans-serif" }}>{chip.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map(k => (
            <div key={k.label} className="rounded-xl p-4 border"
              style={{ background: C.surface, borderColor: C.borderMed, boxShadow: "0 2px 8px rgba(109,40,217,0.08)" }}>
              <p className="text-3xl font-bold tracking-tight mb-1"
                style={{ color: k.color, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{k.after}</p>
              <p className="text-xs" style={{ color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{k.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8" style={{ background: `linear-gradient(to bottom,transparent,${C.purpleLight})` }} />
        <span className="text-xs font-mono" style={{ color: C.textMuted }}>scroll</span>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <SectionWrapper id="overview">
      <SectionLabel>01 Overview</SectionLabel>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <GlassCard className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
            Make AI feel like a person, not a process.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
            BT's existing Sprinklr-powered chatbot left customers frustrated and calling support. As Senior Product Designer I rebuilt it from first principles — every micro-decision in conversation design and information hierarchy had to do heavy lifting within colour-and-font-only platform constraints.
          </p>
        </GlassCard>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Target,   label: "Primary Goal", value: "Reduce agent escalation through AI-first resolution"      },
            { icon: Users,    label: "Users",        value: "BT Business customers across broadband, mobile & security" },
            { icon: Layers,   label: "Constraint",   value: "Sprinklr — colour + font customisation only"              },
            { icon: Brain,    label: "AI Role",      value: "Research, persona synthesis, conversation design, audits"  },
          ].map(item => (
            <GlassCard key={item.label} className="flex flex-col gap-3">
              <item.icon size={18} style={{ color: C.purpleLight }} />
              <p className="text-xs font-mono uppercase tracking-wide" style={{ color: C.textMuted }}>{item.label}</p>
              <p className="text-sm font-medium leading-snug" style={{ fontFamily: "Inter, sans-serif", color: C.text }}>{item.value}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className="md:col-span-2">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: C.purpleLight }}>Stack</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Sprinklr (chatbot platform)",
              "Java",
              ".NET",
              "Figma (design & prototyping)",
              "Mural (workshopping)",
              "ChatGPT (research)",
              "Claude (synthesis)",
              "Maze (usability testing)",
              "Hotjar (session analytics)",
              "JIRA (project tracking)",
              "Confluence (documentation)",
              "Zeplin (dev handoff)",
              "Lottie (micro-animations)",
            ].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-mono border"
                style={{ borderColor: C.borderMed, color: C.purple, background: C.accentSoft }}>{t}</span>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: C.purpleLight }}>Team</p>
          <div className="space-y-1.5">
            {[["1×","Product Manager"],["4×","Developers"],["3×","Testers"],["1×","Solution Architect"],["1×","UX Designer (me)"]].map(([n,r]) => (
              <div key={r} className="flex items-center gap-2">
                <span className="text-sm font-bold font-mono" style={{ color: C.purple }}>{n}</span>
                <span className="text-sm" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{r}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}

function ChallengeSection() {
  const findings = [
    {
      num: "01", title: "Invisible Entry Point", icon: AlertTriangle,
      finding: "No clear affordance — users didn't understand what the bot could do before engaging.",
      impact: "High drop-off before first message. Trust never established.",
      fix: "Redesigned trigger with capability preview and contextual welcome message.",
    },
    {
      num: "02", title: "Rigid Dead-End Flows", icon: RefreshCw,
      finding: "Linear scripts with no fallback logic. Unexpected questions hit walls.",
      impact: "68% of sessions escalated to human agents unnecessarily.",
      fix: "Graceful fallbacks, contextual quick replies, transparent escalation pathways.",
    },
    {
      num: "03", title: "Zero Personalisation", icon: UserCheck,
      finding: "No early login prompt — every response was generic, data re-entered each session.",
      impact: "12-minute average resolution. CSAT: 3.1/5.",
      fix: "Early login unlocks account-aware responses without re-authentication.",
    },
  ];

  return (
    <SectionWrapper id="challenge" style={{ background: C.bgDeep } as CSSProperties}>
      <SectionLabel>02 Challenge</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end gap-8 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight flex-1"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
          Three systemic failures<br />
          <span className="italic font-light" style={{ color: C.purpleLight }}>eroding customer trust.</span>
        </h2>
        <p className="md:max-w-xs text-sm leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
          Before touching a pixel, I audited BT's chatbot against usability, clarity, task completion, and accessibility.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {findings.map(f => (
          <div key={f.num} className="rounded-2xl border p-6 flex flex-col gap-4"
            style={{ background: C.surface, borderColor: C.border, boxShadow: "0 1px 6px rgba(109,40,217,0.06)" }}>
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono" style={{ color: C.purpleLight }}>{f.num}</span>
              <f.icon size={16} style={{ color: C.purpleLight }} />
            </div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{f.title}</h3>
            <p className="text-sm leading-relaxed flex-1" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{f.finding}</p>
            <div className="p-3 rounded-xl" style={{ background: C.redSoft, border: `1px solid ${C.redBorder}` }}>
              <p className="text-xs leading-relaxed" style={{ color: C.redText, fontFamily: "Inter, sans-serif" }}>{f.impact}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: C.accentSoft, border: `1px solid ${C.accentBorder}` }}>
              <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: C.purpleLight }}>Fix</p>
              <p className="text-xs leading-relaxed" style={{ color: C.purple, fontFamily: "Inter, sans-serif" }}>{f.fix}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { metric: "68%",    label: "Sessions escalated to agents" },
          { metric: "12 min", label: "Avg. time to resolve a query"  },
          { metric: "3.1/5",  label: "Customer satisfaction score"   },
          { metric: "31%",    label: "First-contact resolution rate"  },
        ].map(s => (
          <GlassCard key={s.label} className="text-center">
            <p className="text-3xl font-bold mb-1" style={{ color: C.redLight, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{s.metric}</p>
            <p className="text-xs leading-snug" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{s.label}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

function DiscoverySection() {
  const methods = [
    { icon: Search,    title: "Stakeholder Interviews", detail: "5 sessions with support ops, product leads, and contact centre managers."       },
    { icon: BarChart2, title: "Analytics Review",       detail: "3 months of chatbot logs analysed to identify drop-off and unresolved queries." },
    { icon: Globe,     title: "Competitor Benchmarking",detail: "Chatbot maturity evaluated across Vodafone, O2, EE, Three, Sky, and Amazon."   },
    { icon: BookOpen,  title: "UX Audit",               detail: "Heuristic evaluation across 8 principles — 23 distinct friction points surfaced."},
  ];

  return (
    <SectionWrapper id="discovery">
      <SectionLabel>03 Discovery</SectionLabel>
      <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
            Research as a<br /><span className="italic font-light" style={{ color: C.purpleLight }}>strategic lens.</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
            Every method was chosen to answer a specific question about where and why customers abandoned self-service.
          </p>
        </div>
        <div className="space-y-3">
          {methods.map(m => (
            <div key={m.title} className="flex items-start gap-4 p-4 rounded-xl border"
              style={{ background: C.surface, borderColor: C.border }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: C.accentSoft }}>
                <m.icon size={15} style={{ color: C.purpleLight }} />
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ fontFamily: "Inter, sans-serif", color: C.text }}>{m.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GlassCard>
        <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: C.purpleLight }}>Top Call Drivers</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { topic: "View / Query Bill", pct: 34, color: C.purple      },
            { topic: "Broadband Fault",   pct: 28, color: "#7c3aed"     },
            { topic: "Track Order",       pct: 19, color: "#8b5cf6"     },
            { topic: "Account Login",     pct: 12, color: "#a78bfa"     },
            { topic: "Upgrade Query",     pct:  8, color: "#9333ea"     },
            { topic: "Cancellation",      pct:  6, color: "#7c3aed"     },
            { topic: "Contract Info",     pct:  5, color: "#6d28d9"     },
            { topic: "Technical Help",    pct:  4, color: "#8b5cf6"     },
          ].map(d => (
            <div key={d.topic} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{d.topic}</span>
                <span className="text-xs font-mono font-bold" style={{ color: d.color }}>{d.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.bgDeep }}>
                <div className="h-full rounded-full" style={{ width: `${d.pct * 2.5}%`, backgroundColor: d.color }} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}

function AIResearchSection() {
  const [selected, setSelected] = useState(0);
  const c = competitors[selected];

  return (
    <SectionWrapper id="ai-research" style={{ background: C.bgDeep } as CSSProperties}>
      <SectionLabel>04 AI Research</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end gap-8 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight flex-1"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
          AI as a research<br /><span className="italic font-light" style={{ color: C.purpleLight }}>accelerant.</span>
        </h2>
        <p className="md:max-w-sm text-sm leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
          ChatGPT and Claude compressed weeks of competitive research into hours. Every AI output was validated against primary research and reinterpreted through my design lens.
        </p>
      </div>

      <div className="p-5 rounded-2xl mb-8 border"
        style={{ background: C.yellowSoft, borderColor: C.yellowBorder }}>
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} style={{ color: C.yellowText }} />
          <p className="text-xs font-mono" style={{ color: C.yellowText }}>AI PROMPT · Competitive Analysis</p>
        </div>
        <p className="text-sm italic leading-relaxed" style={{ color: C.yellowText, fontFamily: "Inter, sans-serif" }}>
          "Provide a competitive audit for the top 5 UK telecom apps, evaluating onboarding, chatbot UX, self-service, visual design, and key weaknesses. Structure for a design strategy document."
        </p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <AIBadge label="AI Competitive Analysis" />
        <p className="text-xs font-mono" style={{ color: C.textMuted }}>Click to compare</p>
      </div>

      <div className="grid md:grid-cols-5 gap-3 mb-5">
        {competitors.map((comp, i) => (
          <button key={comp.name} onClick={() => setSelected(i)}
            className="rounded-xl p-4 border text-left transition-all"
            style={{
              background: selected === i ? C.accentMid : C.surface,
              borderColor: selected === i ? C.accentBorder : C.border,
              cursor: "pointer",
              boxShadow: selected === i ? `0 2px 8px ${C.accentSoft}` : "0 1px 4px rgba(109,40,217,0.04)",
            }}>
            <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: comp.color }} />
            <p className="text-sm font-semibold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{comp.name}</p>
            <div className="space-y-1.5">
              <div><p className="text-xs mb-1" style={{ color: C.textMuted }}>Chatbot AI</p><ScoreBar value={comp.aiScore} color={comp.color} /></div>
              <div><p className="text-xs mb-1" style={{ color: C.textMuted }}>Self-Service</p><ScoreBar value={comp.selfService} color={comp.color} /></div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl border" style={{ background: C.surface, borderColor: C.border }}>
          <p className="text-sm font-semibold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{c.name} · Strength</p>
          <p className="text-sm" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{c.strength}</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ background: C.redSoft, borderColor: C.redBorder }}>
          <p className="text-sm font-semibold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{c.name} · Weakness</p>
          <p className="text-sm" style={{ color: C.redText, fontFamily: "Inter, sans-serif" }}>{c.weakness}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <GlassCard>
          <HumanBadge label="Human Synthesis" />
          <h3 className="text-lg font-semibold mt-3 mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>The AI gap no-one owned.</h3>
          <p className="text-sm leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
            Every UK competitor's chatbot either escalated too quickly or had no intelligent layer. This confirmed a clear category gap: genuine first-contact resolution, not just FAQ retrieval.
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: C.purpleLight }}>Opportunity Matrix</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Billing Queries",  action: "Prioritise", note: "High demand / Low AI quality",  color: C.purple   },
              { label: "Order Tracking",   action: "Optimise",   note: "High demand / High AI quality", color: "#16a34a"  },
              { label: "Contract Queries", action: "Defer",      note: "Low demand / Low AI quality",   color: C.textMid  },
              { label: "Technical FAQs",   action: "Maintain",   note: "Low demand / High AI quality",  color: "#b45309"  },
            ].map(m => (
              <div key={m.label} className="p-3 rounded-xl border"
                style={{ borderColor: `${m.color}25`, background: `${m.color}08` }}>
                <p className="text-xs font-mono mb-1" style={{ color: m.color }}>{m.action}</p>
                <p className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif", color: C.text }}>{m.label}</p>
                <p className="text-xs mt-0.5" style={{ color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{m.note}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}

function FlowChart() {
  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: C.border, background: C.surface }}>
      <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: C.border }}>
        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: C.purpleLight }}>User Flow — "View My Bill"</p>
        <HumanBadge label="UX Mapping" />
      </div>
      <div className="p-4">
        <svg viewBox="0 0 920 395" className="w-full min-w-[700px]" style={{ fontFamily: "Inter, sans-serif" }}>
          <defs>
            <marker id="fcAr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#7c3aed" />
            </marker>
          </defs>
          <rect x="110" y="8" width="100" height="30" rx="15" fill="#16a34a" />
          <text x="160" y="28" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Start</text>
          <line x1="160" y1="38" x2="160" y2="57" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#fcAr)" />
          <rect x="82" y="57" width="156" height="42" rx="6" fill={C.bgDeep} stroke={C.borderMed} strokeWidth="1" />
          <text x="160" y="74" textAnchor="middle" fill={C.text} fontSize="11">User Clicks</text>
          <text x="160" y="89" textAnchor="middle" fill={C.text} fontSize="11">"Need Help" Widget</text>
          <line x1="160" y1="99" x2="160" y2="118" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#fcAr)" />
          <rect x="60" y="118" width="200" height="46" rx="6" fill={C.bgDeep} stroke={C.borderMed} strokeWidth="1" />
          <text x="160" y="136" textAnchor="middle" fill={C.text} fontSize="11">Chatbot opens with welcome</text>
          <text x="160" y="152" textAnchor="middle" fill={C.text} fontSize="11">message + quick actions</text>
          <line x1="160" y1="164" x2="160" y2="183" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#fcAr)" />
          <rect x="82" y="183" width="156" height="40" rx="6" fill={C.bgDeep} stroke={C.borderMed} strokeWidth="1" />
          <text x="160" y="201" textAnchor="middle" fill={C.text} fontSize="11">User selects</text>
          <text x="160" y="216" textAnchor="middle" fill={C.text} fontSize="11">"View My Bill"</text>
          <line x1="160" y1="223" x2="160" y2="248" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#fcAr)" />
          <polygon points="160,248 206,278 160,308 114,278" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="160" y="274" textAnchor="middle" fill={C.purple} fontSize="10" fontWeight="500">Logged</text>
          <text x="160" y="287" textAnchor="middle" fill={C.purple} fontSize="10" fontWeight="500">in?</text>
          <text x="212" y="272" fill={C.textMuted} fontSize="10">No</text>
          <path d="M206,278 H272" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <rect x="272" y="262" width="124" height="32" rx="6" fill={C.bgDeep} stroke={C.borderMed} strokeWidth="1" />
          <text x="334" y="276" textAnchor="middle" fill={C.text} fontSize="10">Prompt login</text>
          <text x="334" y="288" textAnchor="middle" fill={C.text} fontSize="10">(User logs in)</text>
          <path d="M396,278 H434" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <text x="166" y="325" fill={C.textMuted} fontSize="10">Yes</text>
          <path d="M160,308 V348" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <rect x="82" y="348" width="156" height="32" rx="6" fill={C.bgDeep} stroke={C.borderMed} strokeWidth="1" />
          <text x="160" y="369" textAnchor="middle" fill={C.text} fontSize="11">Proceed to fetch data</text>
          <path d="M238,364 H508 V310" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <rect x="434" y="258" width="152" height="46" rx="6" fill={C.bgDeep} stroke={C.borderMed} strokeWidth="1" />
          <text x="510" y="277" textAnchor="middle" fill={C.text} fontSize="11">Bot fetches bill</text>
          <text x="510" y="292" textAnchor="middle" fill={C.text} fontSize="11">details + shows amount</text>
          <path d="M586,281 H622" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <rect x="622" y="230" width="155" height="100" rx="6" fill={C.bgDeep} stroke={C.borderMed} strokeWidth="1" />
          <text x="699" y="250" textAnchor="middle" fill={C.purple} fontSize="10" fontWeight="600">Bot offers options:</text>
          <text x="699" y="265" textAnchor="middle" fill={C.textMid} fontSize="10">· Download bill</text>
          <text x="699" y="279" textAnchor="middle" fill={C.textMid} fontSize="10">· View breakdown</text>
          <text x="699" y="293" textAnchor="middle" fill={C.textMid} fontSize="10">· Ask a question</text>
          <text x="699" y="307" textAnchor="middle" fill={C.textMid} fontSize="10">· "Something's wrong"</text>
          <path d="M777,280 H800" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <polygon points="834,256 870,280 834,304 798,280" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="834" y="274" textAnchor="middle" fill={C.purple} fontSize="9">Resolved?</text>
          <text x="875" y="275" fill={C.textMuted} fontSize="10">No</text>
          <path d="M870,280 H910 V196 H800" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <rect x="660" y="180" width="140" height="32" rx="6" fill={C.redSoft} stroke={C.redBorder} strokeWidth="1" />
          <text x="730" y="194" textAnchor="middle" fill={C.redText} fontSize="10">Offer escalation</text>
          <text x="730" y="206" textAnchor="middle" fill={C.redText} fontSize="10">to human agent</text>
          <text x="840" y="320" fill={C.textMuted} fontSize="10">Yes</text>
          <path d="M834,304 V355" stroke="#7c3aed" strokeWidth="1.5" fill="none" markerEnd="url(#fcAr)" />
          <rect x="790" y="355" width="88" height="30" rx="15" fill={C.redLight} />
          <text x="834" y="375" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">End Chat</text>
        </svg>
      </div>
    </div>
  );
}

function StrategySection() {
  const phases = [
    { phase: "Discover", icon: Search,      color: C.purple,      desc: "Stakeholder interviews, analytics review, competitor audit."        },
    { phase: "Define",   icon: Target,      color: "#7c3aed",     desc: "Scoped 3 systemic failures and top-driver use cases."              },
    { phase: "Develop",  icon: Layers,      color: "#8b5cf6",     desc: "Conversation trees, flow prototypes, Sprinklr constraint mapping." },
    { phase: "Deliver",  icon: CheckCircle, color: C.accent,      desc: "High-fi UI for Web, iPad, Mobile. Developer handoff through QA."  },
  ];

  return (
    <SectionWrapper id="strategy">
      <SectionLabel>05 Strategy</SectionLabel>
      <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
        Double Diamond,<br /><span className="italic font-light" style={{ color: C.purpleLight }}>applied with precision.</span>
      </h2>
      <p className="text-sm mb-12 max-w-xl" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
        Knowing when to diverge and when to converge kept the project moving without sacrificing rigour.
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-16">
        {phases.map((d, i) => (
          <div key={d.phase} className="relative rounded-2xl p-5 border overflow-hidden"
            style={{ background: C.surface, borderColor: C.border, boxShadow: "0 1px 6px rgba(109,40,217,0.06)" }}>
            <div className="absolute top-0 left-0 w-full h-0.5"
              style={{ background: `linear-gradient(to right,${d.color},transparent)` }} />
            <div className="text-xs font-mono mb-1" style={{ color: d.color }}>Phase {i + 1}</div>
            <d.icon size={18} className="mb-3" style={{ color: d.color }} />
            <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{d.phase}</h3>
            <p className="text-sm" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{d.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>Persona — Emma Johnson</h3>
            <AIBadge label="AI-Synthesised" />
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: C.accentSoft, border: `1px solid ${C.accentBorder}` }}>👩‍💻</div>
            <div>
              <p className="font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>Emma Johnson, 34</p>
              <p className="text-xs" style={{ color: C.textMuted, fontFamily: "Inter, sans-serif" }}>Freelance Designer · London</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Goal",       val: "Resolve issues without calling support"              },
              { label: "Frustration",val: "Loops, re-entering data, generic answers"            },
              { label: "Motivation", val: "Efficiency — minimal disruption to work"             },
              { label: "Trust",      val: "Account-aware responses that prove the bot knows her" },
            ].map(p => (
              <div key={p.label} className="p-3 rounded-xl" style={{ background: C.bgDeep, border: `1px solid ${C.border}` }}>
                <p className="text-xs font-mono mb-1" style={{ color: C.purpleLight }}>{p.label}</p>
                <p className="text-xs" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{p.val}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>Conversation Flow</h3>
          <div className="space-y-2 text-xs font-mono">
            {[
              { type: "system", msg: "User clicks 'Need Help'" },
              { type: "bot",    msg: "Hi Emma 👋 How can I help?" },
              { type: "quick",  msg: "[ View Bill ]  [ Fault ]  [ Track Order ]" },
              { type: "user",   msg: "View My Bill" },
              { type: "bot",    msg: "Your bill is £42.50, due 15 Dec. What next?" },
              { type: "quick",  msg: "[ Download ]  [ Breakdown ]  [ Something's wrong ]" },
              { type: "resolve",msg: "✓ Resolved or smart escalation to agent" },
            ].map((item, i) => (
              <div key={`cf-${i}`} className={`flex ${item.type === "user" ? "justify-end" : "justify-start"}`}>
                {item.type === "system"  && <span className="px-2 py-1 rounded w-full text-center" style={{ color: C.textMuted, background: C.bgDeep }}>{item.msg}</span>}
                {item.type === "bot"     && <span className="px-3 py-2 rounded-xl max-w-xs" style={{ background: C.accentMid, color: C.purple }}>{item.msg}</span>}
                {item.type === "user"    && <span className="px-3 py-2 rounded-xl" style={{ background: C.bgDeep, color: C.text }}>{item.msg}</span>}
                {item.type === "quick"   && <span className="px-2 py-1 rounded w-full text-center" style={{ color: C.purpleLight }}>{item.msg}</span>}
                {item.type === "resolve" && <span className="px-3 py-2 rounded-xl w-full text-center" style={{ background: C.greenSoft, color: C.greenText, border: `1px solid ${C.greenBorder}` }}>{item.msg}</span>}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <FlowChart />
    </SectionWrapper>
  );
}

function DesignSection() {
  return (
    <SectionWrapper id="design" style={{ background: C.bgDeep } as CSSProperties}>
      <SectionLabel>06 Design</SectionLabel>
      <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
        Constraint as<br /><span className="italic font-light" style={{ color: C.purpleLight }}>creative discipline.</span>
      </h2>
      <p className="text-sm mb-10 max-w-xl" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
        Sprinklr limits — colour and font only — forced every decision to be purposeful.
      </p>

      <GlassCard className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>Before / After</h3>
          <HumanBadge label="Design Transformation" />
        </div>
        <div className="grid grid-cols-2 gap-4 rounded-xl overflow-hidden" style={{ height: "320px" }}>
          {/* Before */}
          <div className="flex flex-col p-4 border-r" style={{ background: "#f4f4f8", borderColor: C.border }}>
            <p className="text-xs font-mono mb-3" style={{ color: C.textMuted }}>BEFORE</p>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-1 border flex flex-col" style={{ borderColor: "#e5e5e5" }}>
              <div className="p-3 border-b" style={{ borderColor: "#e5e5e5" }}>
                <p className="text-xs font-semibold text-gray-800">Need Help</p>
              </div>
              <div className="p-3 space-y-2 flex-1">
                <div className="text-xs text-gray-500 bg-gray-100 rounded p-2">Please log in to your BT account for personalised assistance.</div>
                <div className="flex flex-col gap-1">
                  {["Login to my BT account","I am new to BT","I need help logging in"].map(opt => (
                    <button key={opt} className="text-xs border rounded px-2 py-1 text-left" style={{ borderColor: "#5514b4", color: "#5514b4" }}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="p-2 border-t" style={{ borderColor: "#e5e5e5" }}>
                <div className="border rounded px-2 py-1 text-xs text-gray-400" style={{ borderColor: "#ddd" }}>Type your message here...</div>
              </div>
            </div>
          </div>
          {/* After */}
          <div className="flex flex-col p-4" style={{ background: "#f0ebff" }}>
            <p className="text-xs font-mono mb-3" style={{ color: C.purpleLight }}>AFTER</p>
            <div className="flex-1 rounded-xl overflow-hidden border flex flex-col" style={{ borderColor: C.accentBorder, background: C.surface }}>
              <div className="p-3 flex items-center gap-2" style={{ background: `linear-gradient(135deg,#5514b4,#7c3aed)` }}>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">BT Virtual Assistant</p>
                  <p className="text-xs text-white/60">Always here to help</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
              </div>
              <div className="p-3 space-y-3 flex-1">
                <div className="text-xs rounded-xl p-2.5" style={{ background: C.accentMid, color: C.purple }}>
                  Hi Emma! 👋 I can see your broadband account. How can I help?
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {["View My Bill","Report a Fault","Track Order","Settings"].map(opt => (
                    <button key={opt} className="text-xs rounded-lg px-2 py-1.5 text-left"
                      style={{ background: C.accentSoft, color: C.purple, border: `1px solid ${C.accentBorder}` }}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="p-2 border-t flex gap-2" style={{ borderColor: C.border }}>
                <div className="flex-1 rounded-lg px-2 py-1.5 text-xs" style={{ background: C.bgDeep, color: C.textMuted }}>Ask me anything...</div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg,${C.purple},${C.accent})` }}>
                  <ArrowRight size={12} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Sparkles,      title: "AI Prompt Engineering", badge: "ai",    desc: "40+ chatbot response variants generated — tone-tested across 'helpful', 'confident', and 'empathetic' registers, then humanised."                  },
          { icon: Shield,        title: "Accessibility-First",   badge: "human", desc: "WCAG 2.1 AA built into the Sprinklr theme. Contrast ratios validated at every state. 44×44px touch targets."                                          },
          { icon: MessageSquare, title: "Conversation Design",   badge: "human", desc: "Every response hand-crafted after AI draft generation — tone adjusted for BT brand voice, validated against real call scripts."                       },
        ].map(p => (
          <GlassCard key={p.title}>
            <div className="flex items-start justify-between mb-3">
              <p.icon size={18} style={{ color: C.purpleLight }} />
              {p.badge === "ai" ? <AIBadge /> : <HumanBadge />}
            </div>
            <h3 className="text-base font-semibold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{p.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{p.desc}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

function PrototypeSection() {
  const [activeDevice, setActiveDevice] = useState<"web" | "ipad" | "mobile">("web");

  const BTChatWidget = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const isLg = size === "lg", isSm = size === "sm";
    return (
      <div className="rounded-xl overflow-hidden shadow-xl"
        style={{ background: "#fff", border: "1px solid #e5e5e5", width: isLg ? "280px" : isSm ? "190px" : "230px" }}>
        <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "#5514b4" }}>
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold" style={{ color: "#5514b4", fontSize: "9px" }}>BT</span>
          </div>
          <p className={`${isSm ? "text-xs" : "text-sm"} font-semibold text-white`}>How can we help you?</p>
        </div>
        <div className={`${isSm ? "p-2" : "p-3"} space-y-2`}>
          <p className="text-xs text-gray-400 text-center">Thursday, 22 August</p>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#5514b4" }}>
              <span style={{ fontSize: "7px", color: "white", fontWeight: "bold" }}>BT</span>
            </div>
            <div className="flex-1 text-xs bg-gray-100 rounded-lg px-2 py-1.5 text-gray-700">
              Hello! I&apos;m your BT Business Virtual Assistant.
            </div>
          </div>
          {!isSm && (
            <div className="space-y-1.5 ml-1">
              {["Login to my BT account","I am new to BT","I need help logging in"].map(opt => (
                <div key={opt} className="text-xs border rounded-lg px-2 py-1.5 text-center"
                  style={{ borderColor: "#5514b4", color: "#5514b4" }}>{opt}</div>
              ))}
            </div>
          )}
        </div>
        <div className="px-3 pb-3">
          <div className="w-full py-2 rounded-lg text-center text-xs font-semibold text-white" style={{ background: "#5514b4" }}>
            Start chatting
          </div>
        </div>
      </div>
    );
  };

  const BTWebPage = () => (
    <div className="rounded-2xl overflow-hidden border w-full" style={{ borderColor: C.border }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: "#2a2a2a", borderColor: "#444" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 rounded text-xs" style={{ background: "#3a3a3a", color: "#aaa" }}>🔒 bt.com/help-support</div>
      </div>
      <div className="flex items-center gap-5 px-4 py-2.5" style={{ background: "#3d0099" }}>
        <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-white">BT</span>
        </div>
        {["Products & services","Insights","Help & support"].map(n => (
          <span key={n} className="text-xs text-white/80">{n}</span>
        ))}
        <span className="ml-auto text-xs text-white font-medium">My Account</span>
      </div>
      <div className="relative flex" style={{ minHeight: "260px", background: "#f0ebff" }}>
        <div className="relative z-10 flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold leading-tight mb-3" style={{ maxWidth: "340px", color: C.text }}>
            We&apos;ve got your back<br />with cyber security
          </h1>
          <p className="text-xs mb-4 leading-relaxed" style={{ maxWidth: "260px", color: C.textMid }}>
            Unmatched reliability, dedicated support, and robust cyber security — protecting your business is our business.
          </p>
          <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white w-fit" style={{ background: "#7c3aed" }}>
            See how we&apos;ve got your back
          </button>
        </div>
        <div className="relative z-10 flex items-center justify-end p-6 flex-shrink-0">
          <BTChatWidget size="lg" />
        </div>
      </div>
      <div className="px-8 py-6" style={{ background: C.surface }}>
        <h2 className="text-lg font-bold text-center mb-4" style={{ color: C.purple }}>Business solutions you can rely on</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "⊞", title: "Connectivity", desc: "Unbreakable broadband and scalable connectivity."          },
            { icon: "🎧", title: "Support",      desc: "UK-based 24/7 support with managed service options."      },
            { icon: "🔒", title: "Security",     desc: "3,000 experts protecting against 6,500+ attacks/day."    },
          ].map(s => (
            <div key={s.title} className="text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-sm font-semibold mb-1" style={{ color: C.purple }}>{s.title}</p>
              <p className="text-xs" style={{ color: C.textMid }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BTiPad = () => (
    <div className="rounded-3xl overflow-hidden border-4" style={{ borderColor: "#d8d0f0", width: "380px", background: "#fff" }}>
      <div className="h-5 flex items-center justify-center" style={{ background: "#d8d0f0" }}>
        <div className="w-12 h-1 rounded-full" style={{ background: "#b5a8e0" }} />
      </div>
      <div className="flex items-center gap-3 px-3 py-2" style={{ background: "#3d0099" }}>
        <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white font-bold" style={{ fontSize: "7px" }}>BT</span>
        </div>
        {["Products & services","Help & support","My Account"].map(n => (
          <span key={n} className="text-white/80 text-xs">{n}</span>
        ))}
      </div>
      <div className="relative" style={{ background: "#f0ebff", minHeight: "160px" }}>
        <div className="relative z-10 p-4">
          <h2 className="text-base font-bold mb-2" style={{ maxWidth: "180px", color: C.text }}>We&apos;ve got your back</h2>
          <button className="px-3 py-1.5 rounded text-xs font-semibold text-white" style={{ background: "#7c3aed" }}>See how</button>
        </div>
        <div className="absolute right-2 top-2 bottom-2">
          <BTChatWidget size="sm" />
        </div>
      </div>
      <div className="px-4 py-3 grid grid-cols-3 gap-3" style={{ background: C.surface }}>
        {["Connectivity","Support","Security"].map(s => (
          <div key={s} className="text-center">
            <div className="text-lg mb-1">⊞</div>
            <p className="text-xs font-semibold" style={{ color: C.purple }}>{s}</p>
          </div>
        ))}
      </div>
      <div className="h-5 flex items-center justify-center" style={{ background: "#d8d0f0" }} />
    </div>
  );

  const BTMobile = () => (
    <div className="rounded-3xl overflow-hidden border-4" style={{ borderColor: "#d8d0f0", width: "210px", background: "#fff" }}>
      <div className="h-6 flex items-center justify-center" style={{ background: "#d8d0f0" }}>
        <div className="w-14 h-1.5 rounded-full" style={{ background: "#b5a8e0" }} />
      </div>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: "#3d0099" }}>
        <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white font-bold" style={{ fontSize: "7px" }}>BT</span>
        </div>
        <div className="flex gap-2">
          <span className="text-white/80 text-xs">Help</span>
          <span className="text-white/80 text-xs">☰</span>
        </div>
      </div>
      <div style={{ background: "#f0ebff", minHeight: "280px" }}>
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#5514b4" }}>
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <span style={{ fontSize: "7px", fontWeight: "bold", color: "#5514b4" }}>BT</span>
          </div>
          <p className="text-xs font-semibold text-white">BT Virtual Assistant</p>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: "#5514b4" }} />
            <div className="text-xs bg-white rounded-lg px-2 py-1.5 shadow-sm flex-1" style={{ color: C.text }}>Hi! How can I help?</div>
          </div>
          <div className="space-y-1.5 mt-2">
            {["View My Bill","Report a Fault","Track My Order"].map(opt => (
              <div key={opt} className="text-xs border rounded-lg px-2 py-1.5 text-center"
                style={{ borderColor: "#5514b4", color: "#5514b4", background: "#fff" }}>{opt}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-5 flex items-center justify-center" style={{ background: "#d8d0f0" }} />
    </div>
  );

  return (
    <SectionWrapper id="prototype">
      <SectionLabel>07 Prototype</SectionLabel>
      <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
        Every screen,<br /><span className="italic font-light" style={{ color: C.purpleLight }}>every breakpoint.</span>
      </h2>
      <p className="text-sm mb-8 max-w-xl" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
        Three user journeys tested: billing query, planned outage, and fault reporting.
      </p>

      <div className="flex gap-2 mb-8">
        {(["web","ipad","mobile"] as const).map(d => (
          <button key={d} onClick={() => setActiveDevice(d)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all capitalize"
            style={{
              background: activeDevice === d ? `linear-gradient(135deg,${C.purple},${C.accent})` : C.surface,
              color: activeDevice === d ? "#fff" : C.textMid,
              border: `1px solid ${activeDevice === d ? "transparent" : C.border}`,
              fontFamily: "Inter, sans-serif",
              boxShadow: activeDevice === d ? "0 2px 8px rgba(109,40,217,0.2)" : "none",
            }}>{d === "web" ? "Desktop Web" : d === "ipad" ? "iPad" : "Mobile"}</button>
        ))}
      </div>

      <div className="flex justify-center items-start">
        {activeDevice === "web"    && <BTWebPage />}
        {activeDevice === "ipad"   && <BTiPad />}
        {activeDevice === "mobile" && <BTMobile />}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          { title: "Flow 1 · Billing", steps: "6 screens", desc: "Login-aware, live bill data, download and dispute pathways."         },
          { title: "Flow 2 · Outage",  steps: "4 screens", desc: "Proactive notification with ETA and WhatsApp update subscription."   },
          { title: "Flow 3 · Fault",   steps: "8 screens", desc: "Guided diagnostic with smart escalation preserving agent context."   },
        ].map(f => (
          <GlassCard key={f.title}>
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{f.title}</p>
              <CheckCircle size={15} style={{ color: "#16a34a" }} />
            </div>
            <p className="text-xs font-mono mb-3" style={{ color: C.purpleLight }}>{f.steps}</p>
            <p className="text-sm" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{f.desc}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

function ImpactSection() {
  return (
    <SectionWrapper id="impact" style={{ background: C.bgDeep } as CSSProperties}>
      <SectionLabel>08 Impact</SectionLabel>
      <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
        Measurable outcomes.<br /><span className="italic font-light" style={{ color: C.purpleLight }}>Not just delivery.</span>
      </h2>
      <p className="text-sm mb-10 max-w-xl" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
        Shipped November 2024. Tracked across 8-month baseline and 3 months live. Results exceeded all targets.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map(k => (
          <div key={k.label} className="rounded-2xl p-5 border"
            style={{ background: C.surface, borderColor: C.border, boxShadow: "0 1px 6px rgba(109,40,217,0.06)" }}>
            <k.icon size={18} className="mb-3" style={{ color: k.color }} />
            <p className="text-3xl font-bold mb-1" style={{ color: k.color, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{k.after}</p>
            <p className="text-xs font-mono mb-2" style={{ color: C.greenText }}>{k.delta} vs baseline</p>
            <p className="text-xs" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{k.label}</p>
            <p className="text-xs mt-1 font-mono" style={{ color: C.textMuted }}>was {k.before}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: C.purpleLight }}>Resolution Rate (%)</p>
          <AreaChart />
        </GlassCard>
        <GlassCard>
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: C.purpleLight }}>Agent Call Volume (indexed)</p>
          <BarChart />
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, title: "Faster Resolution",   desc: "3.2 min avg. down from 12 min."        },
          { icon: Zap,        title: "Lower Op Costs",      desc: "Top 4 call drivers resolved in-bot."    },
          { icon: Star,       title: "Higher Satisfaction", desc: "CSAT 3.1 → 4.4/5."                     },
          { icon: Users,      title: "Wider Adoption",      desc: "+214% monthly active chatbot sessions." },
        ].map(b => (
          <GlassCard key={b.title}>
            <b.icon size={18} className="mb-3" style={{ color: C.purpleLight }} />
            <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>{b.title}</h3>
            <p className="text-xs" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{b.desc}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

function ReflectionSection() {
  return (
    <SectionWrapper id="reflection">
      <SectionLabel>09 Reflection</SectionLabel>
      <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
            What I&apos;d do<br /><span className="italic font-light" style={{ color: C.purpleLight }}>differently.</span>
          </h2>
          <p className="text-sm" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
            Successful by every measure — but no project is without compromise.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { title: "Earlier usability testing",      desc: "External sessions sooner would have caught the login-timing issue before late-stage."           },
            { title: "Push harder on the platform",    desc: "Closer Sprinklr engineering partnership could have unlocked richer animation controls."         },
            { title: "Document AI process rigorously", desc: "Track which decisions were AI-informed vs. human synthesis — this case study starts that audit." },
          ].map((r, i) => (
            <div key={r.title} className="flex gap-4 p-4 rounded-xl border"
              style={{ background: C.surface, borderColor: C.border }}>
              <span className="text-2xl font-bold flex-shrink-0 leading-none" style={{ color: C.accentBorder, fontFamily: "'Bricolage Grotesque', sans-serif" }}>0{i+1}</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif", color: C.text }}>{r.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-8 border relative overflow-hidden"
        style={{ background: C.accentMid, borderColor: C.accentBorder }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle,#c4b5fd,transparent)" }} />
        <div className="relative z-10">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: C.purple }}>Key Takeaway</p>
          <p className="text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: C.text }}>
            "The most constrained design problems demand the most strategic thinking."
          </p>
          <p className="text-sm max-w-2xl" style={{ color: C.textMid, fontFamily: "Inter, sans-serif" }}>
            AI-accelerated designers think at a higher altitude. The future of UX isn&apos;t AI vs. designer — it&apos;s both, used with rigour and transparency.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t"
        style={{ borderColor: C.border }}>
        <p className="text-xs font-mono" style={{ color: C.textMuted }}>British Telecom · AI Chatbot Redesign · 2024 · Senior Product Designer</p>
        <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2"
          style={{ background: `linear-gradient(135deg,${C.purple},${C.accent})`, fontFamily: "Inter, sans-serif", boxShadow: "0 2px 10px rgba(109,40,217,0.25)" }}>
          Get in Touch <ArrowRight size={14} />
        </button>
      </div>
    </SectionWrapper>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function BTCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes btFloatNode {
          0%   { transform: translateY(0px)   scale(1);    opacity: 0.4; }
          100% { transform: translateY(-18px) scale(1.15); opacity: 0.7; }
        }
        .bt-case-study ::-webkit-scrollbar { width: 4px; }
        .bt-case-study ::-webkit-scrollbar-track { background: transparent; }
        .bt-case-study ::-webkit-scrollbar-thumb { background: rgba(109,40,217,0.2); border-radius: 2px; }
        .bt-case-study { scroll-behavior: smooth; }
      `}</style>

      <div className="bt-case-study min-h-screen" style={{ background: C.bg, color: C.text }}>
        <HeroSection />
        <StickyNav active={activeSection} />
        <OverviewSection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <ChallengeSection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <DiscoverySection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <AIResearchSection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <StrategySection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <DesignSection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <PrototypeSection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <ImpactSection />
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <ReflectionSection />
      </div>
    </>
  );
}
