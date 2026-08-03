import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format: "MON 03 AUG 07:04"
  const formattedTime = format(time, 'EEE dd MMM HH:mm').toUpperCase();

  return (
    <div className="font-mono text-[11px] tracking-widest text-muted-foreground/70 select-none">
      {formattedTime}
    </div>
  );
}
