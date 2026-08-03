import React, { useState, useRef } from 'react';
import { Search, ArrowUp, Grid, User, Calendar, FileText } from 'lucide-react';
import { useLocation } from 'wouter';

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  const handleShortcutClick = (text: string, href?: string) => {
    if (href) { setLocation(href); return; }
    setQuery(text);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // For now just console log, since we don't have an actual backend chat
    console.log("Submitting:", query);
    setQuery('');
  };

  const hasText = query.trim().length > 0;

  return (
    <div className="w-full max-w-[560px] mx-auto flex flex-col items-center justify-center translate-y-[-5vh]">
      <h1 className="text-[28px] md:text-[32px] font-normal text-[#1a1a1a] mb-8 text-center tracking-tight">
        Hello! Hello! I'm Shivangi's portfolio AI
      </h1>

      <form 
        onSubmit={handleSubmit}
        className={`w-full flex items-center bg-white rounded-2xl border px-4 py-3 shadow-sm transition-all duration-300 ${
          isFocused ? 'border-black/20 shadow-md scale-[1.01]' : 'border-black/5 hover:border-black/15'
        }`}
      >
        <Search className="w-5 h-5 text-black/40 shrink-0 mr-3" strokeWidth={2} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask me anything"
          className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-black/30 text-black w-full"
        />

        <button
          type="submit"
          disabled={!hasText}
          className={`shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            hasText 
              ? 'bg-black text-white cursor-pointer opacity-100 scale-100' 
              : 'bg-black/5 text-black/30 cursor-default opacity-80'
          }`}
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        <ShortcutButton 
          icon={<Grid className="w-3.5 h-3.5" />} 
          label="Work" 
          onClick={() => handleShortcutClick('', '/work')}
        />
        <ShortcutButton 
          icon={<User className="w-3.5 h-3.5" />} 
          label="About" 
          onClick={() => handleShortcutClick("Who is Shivangi?")}
        />
        <ShortcutButton 
          icon={<Calendar className="w-3.5 h-3.5" />} 
          label="Experience" 
          onClick={() => handleShortcutClick("What is Shivangi's past experience?")}
        />
        <ShortcutButton 
          icon={<FileText className="w-3.5 h-3.5" />} 
          label="Resume" 
          onClick={() => handleShortcutClick("Show me Shivangi's resume")}
        />
      </div>
    </div>
  );
}

function ShortcutButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-sm text-[13px] font-medium text-black/60 hover:text-black/90 hover:bg-white hover:border-black/10 hover:shadow-sm transition-all duration-200"
    >
      <span className="opacity-70">{icon}</span>
      {label}
    </button>
  );
}
