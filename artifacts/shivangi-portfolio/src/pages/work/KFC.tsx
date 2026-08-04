import { TopBar } from '@/components/TopBar';
import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import {
  InsightCard,
  MetricCard,
  SectionHeading,
  SectionLabel,
  StoryboardStep,
  VisualPlaceholder,
} from '@/components/case-study/CaseStudyBlocks';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const RESEARCH_ACTIVITIES = [
  'KFC field visits',
  'Burger King walkthroughs',
  'McDonald\u2019s walkthroughs',
  'End-to-end journey mapping',
  'Heuristic evaluation',
  'Behavioral observation',
  'Photo and note documentation',
];

const DESIGN_DECISIONS = [
  {
    title: 'Name the decision',
    change:
      'Replace \u201CChoose Size\u201D with a direct choice between Burger Only and Make It a Meal.',
    behavior:
      'Customers recognize the decision before comparing options, reducing interpretation and hesitation.',
    business:
      'More customers can evaluate Meal Maker without staff explanation.',
    measure: 'Meal Attachment Rate · Staff Assistance Rate',
  },
  {
    title: 'Introduce the meal at commitment',
    change:
      'Present Meal Maker immediately after burger selection, while the customer is still shaping the order.',
    behavior:
      'The meal becomes part of the primary decision instead of a late upgrade.',
    business:
      'Improves the chance of meal adoption before customers mentally close the purchase.',
    measure: 'Meal Attachment Rate · Average Order Value',
  },
  {
    title: 'Lead with value',
    change:
      'Show what the meal includes and the saving before asking customers to compare total prices.',
    behavior:
      'Customers assess the option through value rather than price alone.',
    business:
      'Builds confidence in the bundle and supports higher-value orders.',
    measure: 'Meal Attachment Rate · Decision Time',
  },
  {
    title: 'Keep related choices together',
    change:
      'Group fries and drink selection into one coherent meal-customization sequence.',
    behavior:
      'Customers complete one decision before moving to the next, with less context switching.',
    business:
      'Shortens the journey and improves self-service completion.',
    measure: 'Decision Time · Self-Service Completion',
  },
  {
    title: 'Upsell after the primary decision',
    change:
      'Introduce desserts, dips, and additional sides only after the meal choice is complete.',
    behavior:
      'Customers consider extras without interrupting the core purchase.',
    business:
      'Creates incremental revenue without adding friction to Meal Maker adoption.',
    measure: 'Upsell Conversion · Average Order Value',
  },
];

const PRINCIPLES = [
  'Meal first, burger second.',
  'Use language customers understand.',
  'Show savings before price.',
  'Reduce cognitive load at every step.',
  'Group related choices together.',
  'Offer one gentle reminder before checkout.',
];

const STORYBOARD = [
  {
    title: 'Customer approaches kiosk',
    description: '\u201CI\u2019ll order a Zinger.\u201D',
  },
  {
    title: 'Customer selects burger',
    description: 'The primary choice feels complete.',
  },
  {
    title: 'Screen says \u201CChoose Size\u201D',
    description: 'The label suggests a burger-size decision.',
  },
  {
    title: 'Customer hesitates',
    description: 'The options do not match the expected decision.',
  },
  {
    title: 'Customer asks staff',
    description: 'Staff explains that the options are meals.',
  },
  {
    title: 'The opportunity is lost',
    description: 'The customer continues or discovers Meal Maker too late.',
  },
];

function RedesignedJourneyFlow() {
  const connector = <div className="w-px h-7 bg-black/10" />;

  const step = (
    eyebrow: string,
    title: string,
    className = '',
  ) => (
    <div
      className={`w-full max-w-[360px] px-5 py-4 rounded-xl border border-black/[0.08] bg-white text-center shadow-[0_6px_24px_rgba(0,0,0,0.03)] ${className}`}
    >
      <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-black/30">
        {eyebrow}
      </p>
      <p className="mt-1 text-[15px] font-medium text-[#1a1a1a]">{title}</p>
    </div>
  );

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white/70 px-5 py-10 md:px-10 md:py-12 overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="px-8 py-2 rounded-full border border-black/[0.08] bg-white text-[10px] font-medium uppercase tracking-[0.14em] text-black/35">
          Start
        </div>
        {connector}
        {step('01 · Browse', 'Browse Burgers')}
        {connector}
        {step('02 · Select', 'Select a Burger')}
        {connector}
        {step(
          '03 · New behaviour',
          'Meal Maker Introduced',
          'border-[#df1745]/25 bg-[#df1745]/[0.05] [&_p:first-child]:text-[#df1745] [&_p:last-child]:text-[#bd1238]',
        )}
        {connector}

        <div className="relative w-full flex justify-center">
          <div className="relative w-[220px] h-[110px] bg-[#df1745] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]">
            <div className="absolute inset-[1.5px] bg-white [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] flex flex-col items-center justify-center px-9 text-center">
              <p className="text-[14px] font-medium text-[#bd1238]">
                Make it a meal?
              </p>
              <p className="mt-1 text-[10px] text-black/35">New decision point</p>
            </div>
          </div>

          <div className="hidden md:flex absolute left-[calc(50%+108px)] top-1/2 -translate-y-1/2 items-center">
            <div className="w-12 h-px bg-[#df1745]/25" />
            <span className="mx-2 text-[9px] font-semibold uppercase tracking-wider text-[#df1745]">
              No
            </span>
            <div className="w-[180px] px-4 py-3 rounded-lg border border-dashed border-[#df1745]/20 bg-[#df1745]/[0.025]">
              <p className="text-[9px] uppercase tracking-wider text-[#df1745]/60">
                Standalone path
              </p>
              <p className="mt-1 text-[12px] text-black/45">
                Burger → Review Cart
              </p>
            </div>
          </div>
        </div>

        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-600/70">
          Yes → Meal
        </p>
        {connector}

        <div className="md:hidden w-full max-w-[360px] mb-7 px-4 py-3 rounded-lg border border-dashed border-[#df1745]/20 bg-[#df1745]/[0.025] text-center">
          <p className="text-[9px] uppercase tracking-wider text-[#df1745]/60">
            No · Standalone path
          </p>
          <p className="mt-1 text-[12px] text-black/45">
            Burger → Review Cart
          </p>
        </div>

        {step('04 · Choose', 'Select Combo Size')}
        {connector}
        {step('05 · Customise · Single screen', 'Side + Drink')}
        {connector}
        {step(
          '06 · Business opportunity',
          'Smart Upsell',
          'border-dashed border-[#df1745]/25 bg-[#df1745]/[0.025] [&_p:first-child]:text-[#df1745]/60 [&_p:last-child]:text-[#bd1238]',
        )}
        {connector}
        {step('07 · Review', 'Review Cart')}
        {connector}
        {step('08 · Complete', 'Checkout + Pay')}
        {connector}
        <div className="px-8 py-3 rounded-full border border-[#df1745]/35 bg-[#df1745]/[0.03] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#bd1238]">
          Order Placed
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10 pt-6 border-t border-black/[0.05]">
        <div className="flex items-center gap-2 text-[11px] text-black/35">
          <span className="w-3 h-3 rounded-sm bg-[#df1745]/80" />
          New behaviour
        </div>
        <div className="flex items-center gap-2 text-[11px] text-black/35">
          <span className="w-3 h-3 rounded-sm border border-dashed border-[#df1745]/35 bg-[#df1745]/[0.03]" />
          Business opportunity
        </div>
      </div>
    </div>
  );
}

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
    <div className="relative min-h-[100dvh] w-full overflow-x-clip bg-white text-foreground">
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

          {/* Project context */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-y border-black/5 mb-4">
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Project
              </p>
              <p className="text-[14px] text-[#1a1a1a]">Kiosk journey redesign</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Platform
              </p>
              <p className="text-[14px] text-[#1a1a1a]">Self-service kiosk</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Industry
              </p>
              <p className="text-[14px] text-[#1a1a1a]">Quick Service Restaurant</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-1">
                Goal
              </p>
              <p className="text-[14px] text-[#1a1a1a]">Increase Meal Maker adoption</p>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-[11px] font-medium text-black/30 uppercase tracking-wider mb-3">
              Research conducted
            </p>
            <div className="flex flex-wrap gap-2">
              {RESEARCH_ACTIVITIES.map((item) => (
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
              The interface asked one question. Customers understood another.
            </SectionHeading>

            <div className="space-y-6 max-w-[680px] mb-12">
              <p className="text-[16px] text-black/60 leading-[1.75]">
                Meal Maker bundles a burger, fries, and a drink at a better value.
                For KFC, it can increase Average Order Value. For customers, it can
                make a familiar order more economical.
              </p>
              <p className="text-[16px] text-black/60 leading-[1.75]">
                After selecting a burger, customers see a screen titled{' '}
                <span className="text-[#1a1a1a] font-medium">
                  &ldquo;Choose Size&rdquo;
                </span>
                . The system expects a choice between a standalone burger and Meal
                Maker combinations. The label tells customers to expect a burger-size
                decision.
              </p>
              <p className="text-[16px] text-[#1a1a1a] leading-[1.75] font-medium">
                The root problem was not simply that Meal Maker was hidden. The
                interface contradicted the customer&apos;s mental model at the exact
                moment a higher-value choice needed to feel clear.
              </p>
            </div>

            <VisualPlaceholder
              label="Current Kiosk Screen — Choose Size"
              aspect="16/10"
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden border border-black/[0.06] bg-white">
              {[
                {
                  value: '~60%',
                  title: 'Users choose solo burger',
                  context: 'Never see the meal as the default option',
                },
                {
                  value: '₹40–60',
                  title: 'Savings customers miss',
                  context: 'Savings only appear after the price decision',
                },
                {
                  value: '3 taps',
                  title: 'Before meal option appears',
                  context: 'Buried under “Choose Size” — the wrong mental model',
                },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="px-7 py-8 md:px-8 md:py-10 border-b md:border-b-0 md:border-r last:border-0 border-black/[0.06]"
                >
                  <p className="font-serif text-[42px] md:text-[48px] font-semibold leading-none tracking-tight text-[#df1745]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[14px] font-medium text-[#1a1a1a]">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-black/40">
                    {stat.context}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-10 border-t border-black/[0.06]">
              <SectionLabel>User Stories</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    audience: 'First-time orderer',
                    story:
                      '“I want to see the meal option straight after I pick a burger so I don’t miss it.”',
                  },
                  {
                    audience: 'Budget-conscious',
                    story:
                      '“I want to see clearly how much I save if I go for a meal — without doing the maths in my head.”',
                  },
                  {
                    audience: 'New to KFC kiosk',
                    story:
                      '“I want choosing my sides and drink to feel simple — not overwhelming across multiple screens.”',
                  },
                ].map((item) => (
                  <div
                    key={item.audience}
                    className="relative min-h-[190px] px-6 py-7 border border-black/[0.06] bg-white after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#df1745]"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#df1745]">
                      {item.audience}
                    </p>
                    <p className="mt-6 font-serif text-[16px] italic leading-[1.65] text-black/60">
                      {item.story}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── DISCOVERY ── */}
          <section id="discovery" className="scroll-mt-32 mb-32">
            <SectionLabel>Discovery</SectionLabel>
            <SectionHeading className="mb-8">
              Following the decision, not just the screens
            </SectionHeading>

            <p className="text-[16px] text-black/60 leading-[1.75] max-w-[680px] mb-10">
              Field visits at KFC revealed how customers moved from intent to
              selection under time pressure. Competitive walkthroughs at Burger
              King and McDonald&apos;s provided a reference for how comparable
              journeys framed meal decisions. I mapped each end-to-end journey,
              evaluated the interfaces, and documented behavior through photos and
              notes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <VisualPlaceholder label="Research Photo — KFC Kiosk" aspect="4/3" />
              <VisualPlaceholder label="Research Photo — Burger King" aspect="4/3" />
              <VisualPlaceholder label="Research Photo — McDonald's" aspect="4/3" />
            </div>

            <VisualPlaceholder
              label="Competitive Walkthrough Comparison"
              aspect="16/9"
              className="mb-16"
            />

            <VisualPlaceholder
              label="End-to-End Kiosk Journey Map"
              aspect="16/7"
              className="mb-16"
            />

            <SectionLabel>The turning point</SectionLabel>
            <div className="p-8 md:p-10 rounded-2xl border border-black/5 bg-[#1a1a1a] text-white mb-12">
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-4">
                Behavioral insight
              </p>
              <p className="text-[24px] md:text-[28px] font-light leading-snug mb-4">
                &ldquo;Choose Size&rdquo; changes the question in the
                customer&apos;s mind.
              </p>
              <p className="text-[15px] text-white/55 leading-relaxed max-w-[560px]">
                Customers arrive expecting to continue with their burger. The label
                makes them search for size differences when the business needs them
                to compare burger-only and meal options. Hesitation is a predictable
                response to that mismatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
              {[
                'The label frames the wrong decision',
                'Meal value is not immediately legible',
                'Customers must interpret before comparing',
                'Hesitation interrupts self-service',
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
              Six moments show how one ambiguous label turns a simple order into a
              service dependency.
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
              <InsightCard
                number={1}
                title="Language sets the mental model"
                description="Customers interpret the options through the screen title before examining the details."
              />
              <InsightCard
                number={2}
                title="Timing shapes consideration"
                description="Meal Maker must appear while customers are still deciding what the order should become."
              />
              <InsightCard
                number={3}
                title="Value needs a reference"
                description="A saving is easier to understand when it appears before the final price comparison."
              />
              <InsightCard
                number={4}
                title="Confusion becomes service work"
                description="When the interface cannot explain the choice, staff become part of the flow."
              />
              <InsightCard
                number={5}
                title="Sequence protects attention"
                description="The primary meal decision should finish before customization and add-ons begin."
              />
              <InsightCard
                number={6}
                title="Upsell depends on confidence"
                description="Customers are more receptive to extras after the core order is understood."
              />
            </div>
          </section>

          {/* ── SOLUTION ── */}
          <section id="solution" className="scroll-mt-32 mb-32">
            <SectionLabel>Solution</SectionLabel>
            <SectionHeading className="mb-8">
              Reframe the journey around the decision customers are making
            </SectionHeading>

            <p className="text-[16px] text-black/60 leading-[1.75] max-w-[680px] mb-10">
              The redesign did not begin with a new visual treatment. It began by
              correcting the question, moving value into the customer&apos;s line of
              sight, and sequencing secondary choices after the meal decision.
            </p>

            <SectionLabel>Design decisions</SectionLabel>
            <div className="space-y-4 mb-16">
              {DESIGN_DECISIONS.map((decision, index) => (
                <div
                  key={decision.title}
                  className="p-6 md:p-8 rounded-2xl border border-black/5 bg-white"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-[11px] font-medium text-black/25 tracking-wider mt-1">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-medium text-[#1a1a1a] mb-2">
                        {decision.title}
                      </h3>
                      <p className="text-[14px] text-black/55 leading-relaxed">
                        {decision.change}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:pl-9">
                    <div>
                      <p className="text-[10px] font-medium text-black/25 uppercase tracking-wider mb-1.5">
                        Behavior changed
                      </p>
                      <p className="text-[13px] text-black/50 leading-relaxed">
                        {decision.behavior}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-black/25 uppercase tracking-wider mb-1.5">
                        Business value
                      </p>
                      <p className="text-[13px] text-black/50 leading-relaxed">
                        {decision.business}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-black/25 uppercase tracking-wider mb-1.5">
                        Measure
                      </p>
                      <p className="text-[13px] text-black/50 leading-relaxed">
                        {decision.measure}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SectionLabel>Design Principles</SectionLabel>
            <h3 className="text-[24px] md:text-[30px] font-light text-[#1a1a1a] tracking-tight mb-8">
              Designing for better decisions.
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-black/[0.06] bg-white mb-16">
              {PRINCIPLES.map((principle, index) => (
                <div
                  key={principle}
                  className="min-h-[180px] px-6 py-7 border-b sm:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0 border-black/[0.06]"
                >
                  <p className="font-serif text-[36px] font-light leading-none text-black/20">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div className="w-7 h-0.5 bg-[#df1745] mt-4 mb-4" />
                  <p className="text-[14px] leading-relaxed text-black/55">
                    {principle}
                  </p>
                </div>
              ))}
            </div>

            <SectionLabel>User Flow</SectionLabel>
            <div className="mb-16">
              <h3 className="text-[24px] md:text-[30px] font-light text-[#1a1a1a] tracking-tight">
                Redesigned Journey
              </h3>
              <p className="mt-3 mb-8 text-[15px] text-black/50 leading-relaxed max-w-[620px]">
                Reframing the sequence of decisions with a strategic upsell moment
                after commitment.
              </p>
              <RedesignedJourneyFlow />
            </div>

            <SectionLabel>Experience proof</SectionLabel>
            <p className="text-[15px] text-black/50 mb-8">
              The final screens should demonstrate the new decision sequence: name
              the choice, show value, customize the meal, then offer relevant extras.
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
            <SectionLabel>Measuring Success</SectionLabel>
            <SectionHeading className="mb-4">
              Success wasn&apos;t measured by clicks. It was measured by behaviour.
            </SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 mb-6">
              <MetricCard
                value="+16%"
                label="Projected Meal Attachment Rate"
                detail="Customers choosing Meal Maker after selecting a burger."
              />
              <MetricCard
                value="+9%"
                label="Average Order Value (AOV)"
                detail="Higher basket value through clearer meal communication."
              />
              <MetricCard
                value="−30%"
                label="Staff Interventions"
                detail="Fewer customers requiring assistance during ordering."
              />
              <MetricCard
                value="−20%"
                label="Decision Time"
                detail={'Reduced hesitation caused by the “Choose Size” confusion.'}
              />
              <MetricCard
                value="+18%"
                label="Upsell Conversion"
                detail="Higher attachment of drinks, desserts and add-ons through contextual recommendations."
              />
              <MetricCard
                value="90%+"
                label="Self-Service Completion"
                detail="Customers complete the ordering journey without help."
              />
            </div>

            <p className="text-[12px] text-black/35 leading-relaxed max-w-[760px] mb-16">
              Note: These metrics represent projected KPIs and success criteria
              defined during the design phase. They illustrate how the solution
              would be evaluated if implemented in production.
            </p>

            <div className="p-8 md:p-12 rounded-2xl border border-black/5 bg-gradient-to-br from-white to-black/[0.02]">
              <SectionLabel>Reflection</SectionLabel>
              <blockquote className="text-[20px] md:text-[24px] font-light text-[#1a1a1a] leading-snug tracking-tight border-l-2 border-black/10 pl-6 mb-10">
                People rarely make the wrong decision — they make the easiest one.
              </blockquote>
              <p className="text-[17px] md:text-[19px] text-black/60 leading-[1.75] max-w-[680px]">
                Designing this experience taught me that customers rarely make the
                wrong decision — they make the easiest one. By making Meal Maker
                visible at the right moment, simplifying the journey, and
                communicating value more clearly, the kiosk supports better
                decisions without forcing behaviour.
              </p>
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
