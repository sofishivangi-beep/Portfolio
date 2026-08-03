import React from 'react';
import { TopBar } from '@/components/TopBar';
import { HeroSearch } from '@/components/HeroSearch';

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-white text-foreground selection:bg-black/10">
      {/* Background Gradient Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top/Center White Base - implicit from bg-white */}
        
        {/* Soft Pink/Lavender Blob - Bottom Left */}
        <div 
          className="absolute -bottom-[20%] -left-[10%] w-[80%] h-[80%] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(245,213,232,0.8) 0%, rgba(245,213,232,0) 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        {/* Soft Blue/Periwinkle Blob - Bottom Right */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(200,216,248,0.8) 0%, rgba(200,216,248,0) 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        {/* Soft Lavender Blob - Bottom Center */}
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(232,213,245,0.8) 0%, rgba(232,213,245,0) 70%)',
            filter: 'blur(120px)'
          }}
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-center px-6">
        <TopBar />
        <HeroSearch />
      </div>
    </div>
  );
}
