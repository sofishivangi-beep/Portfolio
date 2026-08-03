import { TopBar } from '@/components/TopBar';
import { projects } from '@/data/projects';
import { ArrowUpRight, User, Calendar, FileText } from 'lucide-react';
import { Link, useLocation } from 'wouter';

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const card = (
    <div
      data-testid={`card-project-${project.id}`}
      className="group relative bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      <div
        className={`relative w-full aspect-[16/10] bg-gradient-to-br ${project.gradient} overflow-hidden`}
      >
        <div className="absolute inset-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <div className="flex-1 h-1.5 rounded-full bg-white/20 ml-2" />
          </div>
          <div className="flex gap-2 flex-1">
            <div className="w-1/3 rounded-lg bg-white/20 flex flex-col gap-1.5 p-2">
              {[40, 60, 50, 70, 45].map((w, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full bg-white/40"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <div className="flex-1 rounded-lg bg-white/20 p-2 flex flex-col gap-2">
              <div className="h-3 w-3/4 rounded bg-white/40" />
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="rounded-md bg-white/30" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
            <ArrowUpRight className="w-4 h-4 text-black" />
          </div>
        </div>
      </div>

      <div className="px-4 py-3.5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-black/35 uppercase tracking-wider block mb-0.5">
            {project.tag}
          </span>
          <h3 className="text-[14px] font-medium text-[#1a1a1a] leading-snug">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight className="w-4 h-4 text-black/20 group-hover:text-black/60 transition-colors shrink-0 ml-3" />
      </div>
    </div>
  );

  if (project.slug) {
    return <Link href={`/work/${project.slug}`}>{card}</Link>;
  }

  return card;
}

const MORE_OPTIONS = [
  { key: 'about', label: 'About', icon: <User className="w-3.5 h-3.5" /> },
  { key: 'experience', label: 'Experience', icon: <Calendar className="w-3.5 h-3.5" /> },
  { key: 'resume', label: 'Resume', icon: <FileText className="w-3.5 h-3.5" /> },
];

export default function Work() {
  const [, setLocation] = useLocation();

  function handleOption(key: string) {
    setLocation('/');
    sessionStorage.setItem('pendingPill', key);
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-white text-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[80%] h-[80%] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(245,213,232,0.8) 0%, rgba(245,213,232,0) 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(200,216,248,0.8) 0%, rgba(200,216,248,0) 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, rgba(232,213,245,0.8) 0%, rgba(232,213,245,0) 70%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="relative z-10 min-h-[100dvh] w-full flex flex-col px-6">
        <TopBar />

        <main className="flex-1 w-full max-w-[860px] mx-auto pt-28 pb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-[13px] text-black/35 mb-4">
              <span className="w-4 h-4 rounded-full border border-black/10 flex items-center justify-center text-[10px]">
                ✦
              </span>
              {projects.length} projects
            </div>
            <p className="text-[16px] md:text-[18px] text-[#1a1a1a] leading-relaxed max-w-[600px]">
              <span className="font-semibold">Here&apos;s a look at Shivangi&apos;s work.</span>{' '}
              Product design case studies spanning UX research, service design, and
              interaction design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-10 border-t border-black/6 pt-8">
            <p className="text-[12px] font-medium text-black/35 mb-3">More Options:</p>
            <div className="flex flex-wrap gap-2">
              {MORE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  data-testid={`button-option-${opt.key}`}
                  onClick={() => handleOption(opt.key)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/8 bg-white/70 backdrop-blur-sm text-[13px] font-medium text-black/60 hover:text-black/90 hover:bg-white hover:border-black/15 hover:shadow-sm transition-all duration-200"
                >
                  <span className="opacity-60">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
