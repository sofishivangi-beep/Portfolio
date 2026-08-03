import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'problem', label: 'Problem' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'solution', label: 'Solution' },
  { id: 'impact', label: 'Impact' },
] as const;

export function CaseStudyNav() {
  const [active, setActive] = useState('problem');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className="sticky top-[72px] z-20 -mx-6 px-6 py-3 mb-12 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="flex items-center gap-1 max-w-[960px] mx-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
              active === item.id
                ? 'bg-[#1a1a1a] text-white'
                : 'text-black/45 hover:text-black/80 hover:bg-black/4'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
