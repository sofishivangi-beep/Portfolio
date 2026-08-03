import { TopBar } from '@/components/TopBar';
import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import {
  InsightCard,
  MetricCard,
  PrincipleCard,
  SectionHeading,
  SectionLabel,
  StoryboardStep,
  VisualPlaceholder,
} from '@/components/case-study/CaseStudyBlocks';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const RESPONSIBILITIES = [
  'UX Research',
  'Field Study',
  'Competitive Analysis',
  'Information Architecture',
  'Interaction Design',
  'Prototyping',
  'Usability Testing',
  'Design Strategy',
];

const HYPOTHESES = [
  'Customers don\u2019t know Meal Maker exists.',
  'Customers think meals are expensive.',
  'Meal customization feels overwhelming.',
  'Users mentally commit to burgers too early.',
  '\u201CChoose Size\u201D creates the wrong expectation.',
];

const OPPORTUNITIES = [
  {
    title: 'Clarify',
    items: ['Rename \u201CChoose Size\u201D.', 'Clearly introduce Meal Maker.'],
  },
  {
    title: 'Discover Earlier',
    items: ['Introduce Meal Maker immediately after burger selection.'],
  },
  {
    title: 'Simplify',
    items: ['Reduce screens.', 'Group related decisions.'],
  },
  {
    title: 'Upsell',
    items: [
      'Use modifier stage to introduce desserts, drinks, dips, and sides after Meal selection.',
    ],
  },
];

const PRINCIPLES = [
  'Meal First, Burger Second',
  'Communicate Clearly',
  'Show Savings Before Price',
  'Reduce Cognitive Load',
  'Group Related Decisions',
  'Offer Gentle Recovery Before Checkout',
  'Enable Contextual Upselling',
];

const USER_STORIES = [
  'As a customer, I want to understand meal value immediately so I can make a confident choice without staff help.',
  'As a customer, I want to see my savings before pricing so I feel the meal is worth it.',
  'As a customer, I want a fast, clear path from burger to meal so I don\u2019t hesitate at the kiosk.',
  'As a customer, I want optional add-ons presented at the right moment so I can personalize without overwhelm.',
];

const ACCEPTANCE_CRITERIA = [
  'Meal introduced immediately after burger selection.',
  'Replace \u201CChoose Size\u201D with meaningful language.',
  'Savings visible before pricing.',
  'Meal customization simplified.',
  'Single reminder before checkout.',
  'Upsell introduced during modifiers.',
  'Journey completed without staff assistance.',
];

const STORYBOARD = [
  {
    title: 'Customer approaches kiosk',
    description: '\u201CI\u2019ll order a Zinger.\u201D',
  },
  {
    title: 'Customer selects burger',
    description: 'Burger added to order.',
  },
  {
    title: 'Screen says \u201CChoose Size\u201D',
    description: 'Customer assumes burger size selection. Confusion begins.',
  },
  {
    title: 'Customer hesitates',
    description: 'Unsure whether options represent meals or sizes.',
  },
  {
    title: 'Customer asks staff',
    description: '\u201CIs this a meal?\u201D Staff explains Meal Maker.',
  },
  {
    title: 'Too late to decide well',
    description: 'Standalone burger or late Meal discovery. Opportunity missed.',
  },
];

function GradientBackground() {
  return (
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
            'radial-gradient(circle, rgba(252,220,200,0.6) 0%, rgba(252,220,200,0) 70%)',
          filter: 'blur(120px)',
        }}
      />
    </div>
  );
}

export default function KFCCaseStudy() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-white text-foreground">
      <GradientBackground />

      <div className="relative z-10 min-h-[100dvh] w-full flex flex-col px-6">
        <TopBar />

        <main className="flex-1 w-full max-w-[960px] mx-auto pt-28 pb-24">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[13px] text-black/40 hover:text-black/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Work
          </Link>

          {/* Hero */}
          <header className="mb-4">
            <SectionLabel>Self-service Kiosk UX · QSR</SectionLabel>
            <h1 className="text-[40px] md:text-[52px] font-light text-[#1a1a1a] leading-[1.08] tracking-tight mb-3">
              From Burger to Meal
            </h1>
            <p className="text-[18px] md:text-[20px] text-black/50 font-light leading-relaxed max-w-[640px]">
              Redesigning the KFC Kiosk Experience
            </p>
          </header>

          <VisualPlaceholder
            label="Hero — Kiosk Photography"
            aspect="21/9"
            className="mb-12"
          />

          {/* Project meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-y border-black/5 mb-4">
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Role
              </p>
              <p className="text-[14px] text-[#1a1a1a]">Senior Product Designer</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Platform
              </p>
              <p className="text-[14px] text-[#1a1a1a]">Touchscreen Kiosk</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Duration
              </p>
              <p className="text-[14px] text-[#1a1a1a]">[Duration]</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Industry
              </p>
              <p className="text-[14px] text-[#1a1a1a]">Quick Service Restaurant</p>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-3">
              Responsibilities
            </p>
            <div className="flex flex-wrap gap-2">
              {RESPONSIBILITIES.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full border border-black/6 bg-white/60 text-[12px] text-black/55"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <CaseStudyNav />

          {/* ── PROBLEM ── */}
          <section id="problem" className="scroll-mt-32 mb-32">
            <SectionLabel>Problem</SectionLabel>
            <SectionHeading className="mb-8">
              A mental model mismatch at the moment of decision
            </SectionHeading>

            <div className="space-y-6 max-w-[680px] mb-12">
              <p className="text-[16px] text-black/60 leading-[1.75]">
                KFC Meal Maker gives customers better value by bundling burgers,
                fries, and drinks into a meal. Yet customers frequently purchase
                standalone burgers — leaving value on the table for both parties.
              </p>
              <p className="text-[16px] text-black/60 leading-[1.75]">
                After selecting a burger, customers see a screen titled{' '}
                <span className="text-[#1a1a1a] font-medium">
                  &ldquo;Choose Size&rdquo;
                </span>
                . But this screen isn&apos;t asking for burger size. It&apos;s asking
                them to choose between a standalone burger or a Meal Maker — without
                ever saying &ldquo;Meal.&rdquo;
              </p>
              <p className="text-[16px] text-[#1a1a1a] leading-[1.75] font-medium">
                Many customers believe they&apos;re selecting burger sizes. This
                confusion causes hesitation, staff intervention, and lower Average
                Order Value.
              </p>
            </div>

            <VisualPlaceholder
              label="Current Kiosk Screen — Choose Size"
              aspect="16/10"
              className="mb-12"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Increase Meal Maker adoption',
                'Increase Average Order Value',
                'Reduce staff intervention',
                'Improve ordering confidence',
                'Reduce decision friction',
                'Enable contextual upselling',
              ].map((goal) => (
                <div
                  key={goal}
                  className="px-4 py-3 rounded-xl border border-black/5 bg-white/50 text-[13px] text-black/55"
                >
                  {goal}
                </div>
              ))}
            </div>
          </section>

          {/* ── DISCOVERY ── */}
          <section id="discovery" className="scroll-mt-32 mb-32">
            <SectionLabel>Discovery</SectionLabel>
            <SectionHeading className="mb-8">
              Understanding behavior in the field
            </SectionHeading>

            <p className="text-[16px] text-black/60 leading-[1.75] max-w-[680px] mb-10">
              I visited KFC, Burger King, and McDonald&apos;s to observe kiosk
              ordering, compare meal presentation, and capture the end-to-end
              customer journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <VisualPlaceholder label="Research Photo — KFC Kiosk" aspect="4/3" />
              <VisualPlaceholder label="Research Photo — Burger King" aspect="4/3" />
              <VisualPlaceholder label="Research Photo — McDonald's" aspect="4/3" />
            </div>

            <VisualPlaceholder
              label="Competitive Analysis"
              aspect="16/9"
              className="mb-16"
            />

            <SectionLabel>Initial Hypotheses</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
              {HYPOTHESES.map((hypothesis) => (
                <div
                  key={hypothesis}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-black/5 bg-amber-50/40"
                >
                  <span className="text-[13px] text-amber-600/60 mt-0.5 shrink-0">
                    ?
                  </span>
                  <p className="text-[14px] text-black/60 leading-relaxed">
                    {hypothesis}
                  </p>
                </div>
              ))}
            </div>

            <SectionLabel>Research Findings</SectionLabel>
            <div className="p-8 md:p-10 rounded-2xl border border-black/5 bg-[#1a1a1a] text-white mb-12">
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-4">
                Major Finding
              </p>
              <p className="text-[24px] md:text-[28px] font-light leading-snug mb-4">
                &ldquo;Choose Size&rdquo; creates the wrong mental model.
              </p>
              <p className="text-[15px] text-white/55 leading-relaxed max-w-[560px]">
                Customers interpret it as changing burger size — not entering the
                Meal Maker journey. Meal Maker lacks visibility, savings are hard to
                understand, and no recovery point exists before payment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
              {[
                'Meal Maker lacks visibility',
                'Savings are difficult to understand',
                'Customization feels fragmented',
                'Users frequently require staff assistance',
                'No recovery point before payment',
                'Modifier stage presents upsell opportunity',
              ].map((finding) => (
                <div
                  key={finding}
                  className="px-4 py-3 rounded-xl border border-black/5 text-[14px] text-black/55"
                >
                  {finding}
                </div>
              ))}
            </div>

            <SectionLabel>Storyboard</SectionLabel>
            <p className="text-[15px] text-black/50 mb-8 max-w-[560px]">
              Six steps from intent to confusion — mapping the moment value is lost.
            </p>
            <div className="flex gap-4 overflow-x-auto pb-4 mb-16 -mx-6 px-6">
              {STORYBOARD.map((step, i) => (
                <StoryboardStep
                  key={step.title}
                  step={i + 1}
                  title={step.title}
                  description={step.description}
                  isLast={i === STORYBOARD.length - 1}
                />
              ))}
            </div>

            <SectionLabel>Key Insights</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InsightCard number={1} title="Wrong mental model" />
              <InsightCard number={2} title="Meal introduced too late" />
              <InsightCard number={3} title="Savings hidden" />
              <InsightCard number={4} title="Fragmented customization" />
              <InsightCard number={5} title="Staff dependency" />
              <InsightCard number={6} title="Missed upsell opportunity" />
            </div>
          </section>

          {/* ── SOLUTION ── */}
          <section id="solution" className="scroll-mt-32 mb-32">
            <SectionLabel>Solution</SectionLabel>
            <SectionHeading className="mb-8">
              Making better decisions feel obvious
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {OPPORTUNITIES.map((opp) => (
                <div
                  key={opp.title}
                  className="p-6 rounded-2xl border border-black/5 bg-white"
                >
                  <h3 className="text-[15px] font-medium text-[#1a1a1a] mb-3">
                    {opp.title}
                  </h3>
                  <ul className="space-y-2">
                    {opp.items.map((item) => (
                      <li
                        key={item}
                        className="text-[14px] text-black/55 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-black/20 mt-1 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <SectionLabel>Design Principles</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
              {PRINCIPLES.map((principle) => (
                <PrincipleCard key={principle} title={principle} />
              ))}
            </div>

            <SectionLabel>User Stories</SectionLabel>
            <div className="space-y-3 mb-16">
              {USER_STORIES.map((story) => (
                <div
                  key={story}
                  className="px-5 py-4 rounded-xl border border-black/5 bg-white/60 text-[14px] text-black/55 leading-relaxed italic"
                >
                  {story}
                </div>
              ))}
            </div>

            <SectionLabel>Acceptance Criteria</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-16">
              {ACCEPTANCE_CRITERIA.map((criteria) => (
                <div
                  key={criteria}
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl border border-black/5"
                >
                  <span className="text-emerald-500/60 text-[13px] mt-0.5 shrink-0">
                    ✓
                  </span>
                  <p className="text-[14px] text-black/55">{criteria}</p>
                </div>
              ))}
            </div>

            <SectionLabel>User Flow</SectionLabel>
            <div className="space-y-6 mb-16">
              <VisualPlaceholder label="Current Journey" aspect="16/6" />
              <div className="flex justify-center">
                <span className="text-black/20 text-xl">↓</span>
              </div>
              <VisualPlaceholder label="Improved Journey" aspect="16/6" />
              <div className="flex justify-center">
                <span className="text-black/20 text-xl">↓</span>
              </div>
              <VisualPlaceholder label="Final Experience" aspect="16/6" />
            </div>

            <SectionLabel>Final Screens</SectionLabel>
            <p className="text-[15px] text-black/50 mb-8">
              Before and after — minimal annotations, maximum clarity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-3 text-center">
                  Before
                </p>
                <VisualPlaceholder label="Kiosk Screen — Before" aspect="9/16" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-3 text-center">
                  After
                </p>
                <VisualPlaceholder label="Kiosk Screen — After" aspect="9/16" />
              </div>
            </div>
          </section>

          {/* ── IMPACT ── */}
          <section id="impact" className="scroll-mt-32 mb-16">
            <SectionLabel>Impact</SectionLabel>
            <SectionHeading className="mb-4">
              Projected outcomes
            </SectionHeading>
            <p className="text-[14px] text-black/40 mb-10 max-w-[560px]">
              These represent projected KPIs defined during the design phase and
              would require production validation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
              <MetricCard value="+15%" label="Projected Meal Attachment Rate" />
              <MetricCard value="+8%" label="Average Order Value" />
              <MetricCard value="-30%" label="Staff Assistance" />
              <MetricCard value="-20%" label="Decision Time" />
              <MetricCard value="+18%" label="Upsell Conversion" />
              <MetricCard value="90%+" label="Self-Service Completion" />
            </div>

            <div className="p-8 md:p-12 rounded-2xl border border-black/5 bg-gradient-to-br from-white to-black/[0.02]">
              <SectionLabel>Reflection</SectionLabel>
              <p className="text-[17px] md:text-[19px] text-black/60 leading-[1.75] max-w-[640px] mb-6">
                The biggest lesson from this project was not redesigning kiosk
                screens. It was understanding how customers make decisions under
                time pressure.
              </p>
              <p className="text-[17px] md:text-[19px] text-black/60 leading-[1.75] max-w-[640px] mb-10">
                By reducing ambiguity, communicating value earlier, and aligning
                the interface with the user&apos;s mental model, the experience
                supports better decisions for both customers and the business.
              </p>
              <blockquote className="text-[20px] md:text-[24px] font-light text-[#1a1a1a] leading-snug tracking-tight border-l-2 border-black/10 pl-6">
                Great experiences don&apos;t force better decisions.
                <br />
                They make better decisions feel obvious.
              </blockquote>
            </div>
          </section>

          <div className="mt-16 pt-8 border-t border-black/6">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[13px] text-black/40 hover:text-black/70 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to all projects
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
