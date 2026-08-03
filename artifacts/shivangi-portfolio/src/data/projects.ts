export type Project = {
  id: number;
  slug?: string;
  title: string;
  tag: string;
  gradient: string;
  accent: string;
  mockBg: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'kfc',
    title: 'From Burger to Meal',
    tag: 'Product Design',
    gradient: 'from-red-300 via-rose-400 to-amber-400',
    accent: '#fecaca',
    mockBg: 'bg-red-50',
  },
  {
    id: 2,
    title: 'Redesigning the Onboarding Experience',
    tag: 'UX Research',
    gradient: 'from-violet-300 via-purple-400 to-fuchsia-500',
    accent: '#ede9fe',
    mockBg: 'bg-violet-50',
  },
  {
    id: 3,
    title: 'Mobile App Design System',
    tag: 'Design System',
    gradient: 'from-emerald-300 via-teal-400 to-cyan-500',
    accent: '#d1fae5',
    mockBg: 'bg-emerald-50',
  },
  {
    id: 4,
    title: 'AI-Powered Feature Discovery Flow',
    tag: 'Interaction Design',
    gradient: 'from-amber-300 via-orange-400 to-rose-400',
    accent: '#fed7aa',
    mockBg: 'bg-amber-50',
  },
];
