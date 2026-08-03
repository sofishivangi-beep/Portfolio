import { ReactNode } from 'react';

export function VisualPlaceholder({
  label,
  aspect = '16/10',
  className = '',
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full rounded-2xl border border-dashed border-black/10 bg-black/[0.02] flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] to-black/[0.04]" />
      <span className="relative text-[12px] font-medium text-black/25 uppercase tracking-widest text-center px-6">
        {label}
      </span>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium text-black/35 uppercase tracking-[0.15em] mb-4">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[28px] md:text-[36px] font-light text-[#1a1a1a] leading-[1.15] tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function InsightCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description?: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-black/5 bg-white hover:shadow-sm transition-shadow">
      <span className="text-[11px] font-medium text-black/25 uppercase tracking-wider">
        Insight {number}
      </span>
      <h3 className="mt-2 text-[17px] font-medium text-[#1a1a1a] leading-snug">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-[14px] text-black/50 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function MetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="p-6 md:p-8 rounded-2xl border border-black/5 bg-white text-center">
      <p className="text-[36px] md:text-[44px] font-light text-[#1a1a1a] tracking-tight">
        {value}
      </p>
      <p className="mt-2 text-[13px] text-black/45 leading-snug">{label}</p>
    </div>
  );
}

export function PrincipleCard({ title }: { title: string }) {
  return (
    <div className="px-5 py-4 rounded-xl border border-black/5 bg-white/60 backdrop-blur-sm">
      <p className="text-[14px] font-medium text-[#1a1a1a]">{title}</p>
    </div>
  );
}

export function StoryboardStep({
  step,
  title,
  description,
  isLast = false,
}: {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex flex-col items-center min-w-[160px] max-w-[180px] shrink-0">
      <div className="w-full aspect-[4/3] rounded-xl border border-dashed border-black/10 bg-black/[0.02] flex items-center justify-center mb-3">
        <span className="text-[10px] text-black/20 uppercase tracking-wider">
          Illustration
        </span>
      </div>
      <span className="text-[10px] font-medium text-black/30 uppercase tracking-wider mb-1">
        Step {step}
      </span>
      <p className="text-[13px] font-medium text-[#1a1a1a] text-center leading-snug mb-1">
        {title}
      </p>
      <p className="text-[12px] text-black/45 text-center leading-relaxed">
        {description}
      </p>
      {!isLast && (
        <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-black/15 text-lg">
          ↓
        </span>
      )}
    </div>
  );
}
