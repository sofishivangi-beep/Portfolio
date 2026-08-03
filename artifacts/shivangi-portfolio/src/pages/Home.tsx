import React, { useState, useRef, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { Search, ArrowUp, Grid, User, Calendar, FileText } from 'lucide-react';
import { ChatThread, Message } from '@/components/ChatThread';
import { useLocation } from 'wouter';

/* ── Background blobs (shared between Home states) ── */
function GradientBg() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -bottom-[20%] -left-[10%] w-[80%] h-[80%] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(245,213,232,0.8) 0%, rgba(245,213,232,0) 70%)', filter: 'blur(100px)' }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(200,216,248,0.8) 0%, rgba(200,216,248,0) 70%)', filter: 'blur(100px)' }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(232,213,245,0.8) 0%, rgba(232,213,245,0) 70%)', filter: 'blur(120px)' }}
      />
    </div>
  );
}

/* ── Pill shortcut buttons ── */
function Pill({
  icon, label, onClick,
}: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`button-pill-${label.toLowerCase()}`}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/8 bg-white/60 backdrop-blur-sm text-[13px] font-medium text-black/60 hover:text-black/90 hover:bg-white hover:border-black/15 hover:shadow-sm transition-all duration-200"
    >
      <span className="opacity-70">{icon}</span>
      {label}
    </button>
  );
}

/* ── AI response builder ── */
function buildAiContent(key: string, freeText?: string): Message {
  if (key === 'about') return { role: 'ai', content: { type: 'about' } };
  if (key === 'experience') return { role: 'ai', content: { type: 'experience' } };
  if (key === 'resume') return { role: 'ai', content: { type: 'resume' } };
  return { role: 'ai', content: { type: 'fallback', text: freeText ?? key } };
}

const PILL_LABELS: Record<string, string> = {
  about: "Who is Shivangi?",
  experience: "What's Shivangi's experience?",
  resume: "Show me Shivangi's resume",
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [shownTopics, setShownTopics] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const isChat = messages.length > 0;
  const hasText = query.trim().length > 0;

  // Handle redirect from Work page's More Options buttons
  useEffect(() => {
    const pending = sessionStorage.getItem('pendingPill');
    if (pending) {
      sessionStorage.removeItem('pendingPill');
      const label = PILL_LABELS[pending] ?? pending;
      const userMsg: Message = { role: 'user', text: label };
      const aiMsg = buildAiContent(pending, label);
      setMessages([userMsg, aiMsg]);
      setShownTopics(new Set([pending]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to bottom whenever messages grow
  useEffect(() => {
    if (isChat) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChat]);

  function sendMessage(text: string, topicKey?: string) {
    const userMsg: Message = { role: 'user', text };
    const aiMsg = buildAiContent(topicKey ?? '__free__', text);
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    if (topicKey) setShownTopics((prev) => new Set([...prev, topicKey]));
    setQuery('');
  }

  function handlePill(key: string) {
    if (key === 'work') { setLocation('/work'); return; }
    sendMessage(PILL_LABELS[key] ?? key, key);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasText) return;
    // Detect intent from free text
    const lower = query.toLowerCase();
    const key = lower.includes('about') || lower.includes('who')
      ? 'about'
      : lower.includes('experience') || lower.includes('work history')
      ? 'experience'
      : lower.includes('resume') || lower.includes('cv')
      ? 'resume'
      : lower.includes('work') || lower.includes('project') || lower.includes('portfolio')
      ? 'work'
      : undefined;

    if (key === 'work') { setLocation('/work'); return; }
    sendMessage(query, key);
  }

  /* ── Chat input (used both centered and fixed-bottom) ── */
  const chatInput = (
    <form
      onSubmit={handleSubmit}
      className={`w-full flex items-center bg-white rounded-2xl border px-4 py-3 shadow-sm transition-all duration-300 ${
        isFocused ? 'border-black/20 shadow-md' : 'border-black/8 hover:border-black/15'
      }`}
    >
      <Search className="w-5 h-5 text-black/35 shrink-0 mr-3" strokeWidth={2} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Ask me anything"
        data-testid="input-chat"
        className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-black/30 text-black"
      />
      <button
        type="submit"
        disabled={!hasText}
        data-testid="button-submit"
        className={`shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          hasText
            ? 'bg-black text-white cursor-pointer'
            : 'bg-black/5 text-black/25 cursor-default'
        }`}
      >
        <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </form>
  );

  /* ── Pills row ── */
  const pills = (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Pill icon={<Grid className="w-3.5 h-3.5" />} label="Work" onClick={() => handlePill('work')} />
      <Pill icon={<User className="w-3.5 h-3.5" />} label="About" onClick={() => handlePill('about')} />
      <Pill icon={<Calendar className="w-3.5 h-3.5" />} label="Experience" onClick={() => handlePill('experience')} />
      <Pill icon={<FileText className="w-3.5 h-3.5" />} label="Resume" onClick={() => handlePill('resume')} />
    </div>
  );

  return (
    <div className="relative min-h-[100dvh] w-full bg-white text-foreground selection:bg-black/10">
      <GradientBg />

      {/* ── IDLE STATE: centred greeting ── */}
      {!isChat && (
        <div className="relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-center px-6">
          <TopBar />
          <div className="w-full max-w-[560px] mx-auto flex flex-col items-center translate-y-[-5vh]">
            <h1 className="text-[28px] md:text-[32px] font-normal text-[#1a1a1a] mb-8 text-center tracking-tight">
              Hello! I'm Shivangi's portfolio AI
            </h1>
            {chatInput}
            <div className="mt-6">{pills}</div>
          </div>
        </div>
      )}

      {/* ── CHAT STATE: scrollable thread + fixed bottom input ── */}
      {isChat && (
        <div className="relative z-10 flex flex-col min-h-[100dvh]">
          <TopBar />

          {/* Scrollable messages */}
          <div className="flex-1 overflow-y-auto pt-24 pb-40 px-6">
            <ChatThread
              messages={messages}
              shownTopics={shownTopics}
              onQuickAction={handlePill}
            />
            <div ref={chatBottomRef} />
          </div>

          {/* Fixed bottom input bar */}
          <div className="fixed bottom-0 left-0 right-0 z-20 px-6 pb-6 pt-4 bg-gradient-to-t from-white via-white/95 to-transparent">
            <div className="max-w-[660px] mx-auto space-y-3">
              {chatInput}
              <div className="flex justify-center">{pills}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
