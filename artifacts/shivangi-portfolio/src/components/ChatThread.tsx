import React, { useEffect, useRef } from 'react';
import { Grid, User, Calendar, FileText, ArrowUpRight } from 'lucide-react';

export type Message =
  | { role: 'user'; text: string }
  | { role: 'ai'; content: AiContent };

export type AiContent =
  | { type: 'about' }
  | { type: 'experience' }
  | { type: 'resume' }
  | { type: 'fallback'; text: string };

const SHOWN_LABELS: Record<string, string> = {
  about: 'About',
  experience: 'Experience',
  resume: 'Resume',
};

function AboutResponse() {
  return (
    <div className="space-y-4">
      <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
        <span className="font-semibold">Hi, I'm Shivangi — a Product & UX Designer</span> who loves crafting
        thoughtful digital experiences. I believe great design lives at the intersection of
        empathy, clarity, and craft.
      </p>
      <p className="text-[15px] leading-relaxed text-black/60">
        I'm passionate about understanding real user problems and translating them into elegant,
        functional solutions. Whether it's a complex SaaS dashboard or a delightful onboarding
        flow, I care deeply about every interaction.
      </p>
      <div className="grid grid-cols-2 gap-3 pt-1">
        {[
          { label: 'Based in', value: 'India' },
          { label: 'Focus', value: 'Product Design' },
          { label: 'Background', value: 'UI/UX + Research' },
          { label: 'Open to', value: 'Full-time & Freelance' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-black/[0.03] rounded-xl px-4 py-3">
            <p className="text-[11px] font-medium text-black/35 uppercase tracking-wider mb-0.5">{label}</p>
            <p className="text-[14px] font-medium text-[#1a1a1a]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceResponse() {
  const items = [
    {
      role: 'Senior Product Designer',
      company: 'Company Name · Full-time',
      period: '2023 – Present',
      desc: 'Leading end-to-end design for core product features. Collaborating with PMs and engineers to ship user-centered solutions at scale.',
    },
    {
      role: 'UX Designer',
      company: 'Company Name · Full-time',
      period: '2021 – 2023',
      desc: 'Designed onboarding flows, design systems, and mobile experiences. Ran usability studies and translated insights into product decisions.',
    },
    {
      role: 'UI/UX Design Intern',
      company: 'Startup · Internship',
      period: '2020 – 2021',
      desc: 'Worked on mobile app redesign and brand identity. Built component libraries and contributed to user research.',
    },
  ];

  return (
    <div className="space-y-1">
      <p className="text-[15px] text-[#1a1a1a] mb-4">
        <span className="font-semibold">Here's Shivangi's experience.</span>{' '}
        <span className="text-black/50">Placeholder — real details coming soon.</span>
      </p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-black/20 mt-1.5 shrink-0 group-first:bg-black/60" />
              {i < items.length - 1 && <div className="w-px flex-1 bg-black/10 mt-1" />}
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[14px] font-semibold text-[#1a1a1a]">{item.role}</span>
                <span className="text-[12px] text-black/35 font-medium">{item.period}</span>
              </div>
              <p className="text-[13px] text-black/50 mb-1">{item.company}</p>
              <p className="text-[13px] text-black/60 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeResponse() {
  return (
    <div className="space-y-4">
      <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
        <span className="font-semibold">Here's Shivangi's resume.</span>{' '}
        <span className="text-black/50">Placeholder — real resume will be linked here.</span>
      </p>
      <div className="border border-black/8 rounded-2xl overflow-hidden">
        {/* Resume preview card */}
        <div className="bg-gradient-to-br from-slate-50 to-white px-6 py-5 border-b border-black/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[18px] font-semibold text-[#1a1a1a]">Shivangi</p>
              <p className="text-[13px] text-black/50 mt-0.5">Product & UX Designer · Available for opportunities</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-200 to-pink-200 shrink-0" />
          </div>
        </div>
        <div className="px-6 py-4 grid grid-cols-2 gap-x-6 gap-y-3">
          {[
            { label: 'Skills', value: 'Figma, Prototyping, User Research, Design Systems' },
            { label: 'Education', value: 'B.Des / B.Tech — Placeholder University' },
            { label: 'Tools', value: 'Figma · Notion · Miro · Jira' },
            { label: 'Languages', value: 'English, Hindi' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] font-medium text-black/35 uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-[13px] text-[#1a1a1a]">{value}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-black/5 bg-black/[0.01]">
          <button
            data-testid="button-download-resume"
            className="flex items-center gap-2 text-[13px] font-medium text-black/70 hover:text-black transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            Download full resume (PDF) · Coming soon
          </button>
        </div>
      </div>
    </div>
  );
}

function FallbackResponse({ text }: { text: string }) {
  return (
    <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
      Thanks for asking about{' '}
      <span className="italic">"{text}"</span>. Shivangi's portfolio AI is still being set up —
      check back soon for real answers, or browse the sections below.
    </p>
  );
}

const MORE_OPTIONS = [
  { key: 'about', label: 'About', icon: <User className="w-3.5 h-3.5" /> },
  { key: 'experience', label: 'Experience', icon: <Calendar className="w-3.5 h-3.5" /> },
  { key: 'resume', label: 'Resume', icon: <FileText className="w-3.5 h-3.5" /> },
  { key: 'work', label: 'Work', icon: <Grid className="w-3.5 h-3.5" /> },
];

interface ChatThreadProps {
  messages: Message[];
  shownTopics: Set<string>;
  onQuickAction: (key: string) => void;
}

export function ChatThread({ messages, shownTopics, onQuickAction }: ChatThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const remainingOptions = MORE_OPTIONS.filter((o) => !shownTopics.has(o.key));

  return (
    <div className="w-full max-w-[660px] mx-auto space-y-6 pb-4">
      {messages.map((msg, i) => (
        <div key={i} data-testid={`message-${i}`}>
          {msg.role === 'user' ? (
            /* User bubble — right-aligned, pill shape */
            <div className="flex justify-end">
              <div className="bg-black/[0.06] rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                <p className="text-[14px] font-medium text-[#1a1a1a]">{msg.text}</p>
              </div>
            </div>
          ) : (
            /* AI response */
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-300 to-pink-300 shrink-0" />
                <span className="text-[12px] font-medium text-black/40">Shivangi's AI</span>
              </div>
              <div className="pl-7">
                {msg.content.type === 'about' && <AboutResponse />}
                {msg.content.type === 'experience' && <ExperienceResponse />}
                {msg.content.type === 'resume' && <ResumeResponse />}
                {msg.content.type === 'fallback' && <FallbackResponse text={msg.content.text} />}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* More options after last AI message */}
      {messages.length > 0 && messages[messages.length - 1].role === 'ai' && remainingOptions.length > 0 && (
        <div className="pl-7">
          <p className="text-[12px] font-medium text-black/35 mb-2">More Options:</p>
          <div className="flex flex-wrap gap-2">
            {remainingOptions.map((opt) => (
              <button
                key={opt.key}
                data-testid={`button-option-${opt.key}`}
                onClick={() => onQuickAction(opt.key)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/8 bg-white/70 backdrop-blur-sm text-[13px] font-medium text-black/60 hover:text-black/90 hover:bg-white hover:border-black/15 hover:shadow-sm transition-all duration-200"
              >
                <span className="opacity-60">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
