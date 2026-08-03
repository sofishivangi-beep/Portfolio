import React, { useState } from 'react';
import { Clock } from './Clock';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'wouter';

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full p-6 flex items-center justify-between z-10">
      {/* Logo */}
      <div className="w-32 flex justify-start">
        <Link href="/">
          <span className="font-script text-3xl text-foreground/80 hover:text-foreground transition-colors cursor-pointer select-none">
            Shivangi
          </span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="flex-1 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-12 rounded-full border border-black/5 flex items-center justify-center bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-black/5">
              <MoreHorizontal className="w-4 h-4 text-foreground/60" strokeWidth={2} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="min-w-[120px] rounded-xl border-black/5 bg-white/95 backdrop-blur-md shadow-sm">
            <DropdownMenuItem className="cursor-pointer text-xs justify-center font-medium">Work</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs justify-center font-medium">About</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs justify-center font-medium">Contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Clock */}
      <div className="w-32 flex justify-end">
        <Clock />
      </div>
    </header>
  );
}
