import HomeHero from '@/app/(main)/_components/home-hero';
import UsageGap from '@/app/(main)/_components/usage-gap';
import ExcelTrap from '@/app/(main)/_components/excel-trap';
import ProblemEvidence from '@/app/(main)/_components/problem-evidence';
import FeatureCard from '@/components/feature-card';
import CustomButton from '@/components/button';
import PageSection from '@/components/page-section';
import SectionHeading from '@/components/section-heading';
import CtaBand from '@/components/cta-band';
import { DynamicIcon } from '@/components/dynamic-icon';
import StructuredData from '@/components/structured-data';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { accentAt } from '@/lib/brand';
import type { Service } from '@/lib/supabase/types';

export const metadata = {
  title: 'Coverage is not a data system',
  description:
    'Uganda has 96% 4G coverage and 28% internet use. Metis Analytica dismantles the Excel trap — silos, dark data, and manual inertia — with a data operating system for NGOs, SMEs, corporations, and government.',
  alternates: { canonical: '/' },
};

const impact = [
  { value: '20%', label: 'Revenue lift when decisions run on data, not files' },
  { value: '15%', label: 'Lower operating cost from data-driven operations' },
  { value: '90%', label: 'Faster finance processing versus manual methods' },
  { value: '32.71%', label: 'Efficiency gain reported by SMEs that automate' },
];

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(4);
  const services = (data ?? []) as Service[];

  return (
    <>
      <StructuredData />
      <HomeHero />

      <PageSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The usage gap"
              title="4G covers the country. Work still happens in analog."
              description="Of 100 people, 96 live under 4G. Only 28 actually use the internet. The remaining 68 are covered and unused — and that is where institutional intelligence goes dark. Generic websites sit on top of that mess. Metis starts underneath: one source of truth, then intelligence, then action."
            />
          </div>
          <UsageGap />
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading
          eyebrow="The Excel trap"
          title="Institutional intelligence is trapped in files nobody else can use."
          description="Dark data in isolated spreadsheets, paper, and ministry walls burns time, money, and service delivery. This is not a software shortage. It is fragmentation."
        />
        <div className="rounded-2xl bg-[var(--graphite-black)] px-4 py-8 sm:px-8 sm:py-10 mb-10">
          <ExcelTrap />
        </div>
        <ProblemEvidence />
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="The operating system"
          title="From viewing data to acting on it"
          description="Metis designs, builds, and runs the layers that turn static reporting into automated work — without asking every officer to become an analyst."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => (
            <FeatureCard
              key={service.id}
              icon={<DynamicIcon name={service.icon} sx={{ fontSize: 40 }} />}
              title={service.title}
              description={service.description}
              color={service.color}
              href="/services"
            />
          ))}
        </div>
      </PageSection>

      <section className="bg-[color-mix(in_srgb,var(--accent-blue)_10%,transparent)] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {impact.map((item, index) => (
            <div key={item.label} className="min-w-0 text-center sm:text-left">
              <p
                className="text-2xl sm:text-4xl font-bold tabular-nums leading-none"
                style={{ color: accentAt(index) }}
              >
                {item.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="Why Metis"
          title="Not another website shop. A data custodian."
          description="Uganda's ICT market is full of generic IT support. Almost none of it specializes in sovereign data architecture or automation engineering."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 sm:p-6">
            <p className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tabular-nums">59%</p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              of government agencies reported a cybersecurity incident last year
            </p>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
              Metis embeds governance and security in the architecture, not as a slide at the end of a project.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 sm:p-6">
            <p className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tabular-nums">5.6%</p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              of local-government staff routinely use a computer
            </p>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
              Systems should execute routine work. Leadership gets performance intelligence; staff are not asked to become data clerks.
            </p>
          </div>
        </div>
      </PageSection>

      <CtaBand
        title="Ready to leave the analog default?"
        description="Tell us where the files live. We will show you what a single source of truth would change."
        actions={
          <>
            <CustomButton href="/consultation" variant="contained" size="large">
              Book a Consultation
            </CustomButton>
            <CustomButton href="/contact" variant="outlined" size="large">
              Start a Conversation
            </CustomButton>
          </>
        }
      />
    </>
  );
}
