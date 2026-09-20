import { Box, Grid, Typography } from '@mui/material';
import { VerifiedUser, Lightbulb, Gavel, AutoFixHigh } from '@mui/icons-material';
import Hero from '@/components/hero';
import StatsCard from '@/components/stats-card';
import CustomButton from '@/components/button';
import PageSection from '@/components/page-section';
import SectionHeading from '@/components/section-heading';
import { accentAt } from '@/lib/brand';

export const metadata = {
  title: 'About',
  description:
    'Metis Analytica is a data custodian and partner — we design, build, and safeguard sovereign data infrastructure for NGOs, SMEs, corporations, and government in emerging markets.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Metis Analytica',
    description: 'How we design, build, and safeguard sovereign data infrastructure for institutions in emerging markets.',
    url: '/about',
  },
};

export default function About() {
  const coreValues = [
    {
      icon: <VerifiedUser sx={{ fontSize: 32 }} />,
      title: 'Data Custodianship',
      description: "We take responsibility for your institutional data. It's protected, structured, and evolves with your needs.",
    },
    {
      icon: <Lightbulb sx={{ fontSize: 32 }} />,
      title: 'Infrastructure-First',
      description: 'Strong foundations enable innovation. We design for scale, reliability, and long-term institutional value.',
    },
    {
      icon: <Gavel sx={{ fontSize: 32 }} />,
      title: 'Security & Governance',
      description: 'Security is embedded, not bolted on. Clear ownership, transparent processes, and ethical data use.',
    },
    {
      icon: <AutoFixHigh sx={{ fontSize: 32 }} />,
      title: 'Practical Impact',
      description: "We don't build for theory. Every system drives real decisions, efficiency, and institutional accountability.",
    },
  ];

  const phases = [
    {
      phase: 'Phase 1',
      title: 'Foundation Builder',
      description: 'Focus: Data Infrastructure & Solutions. We establish the data backbone your institution needs to operate intelligently.',
      items: ['Data audits', 'Cloud platforms', 'Data integration', 'Initial dashboards'],
    },
    {
      phase: 'Phase 2',
      title: 'Institutional Data Partner',
      description: 'Focus: Custodianship & Long-term Management. From projects to partnerships—we become the steward of your data.',
      items: ['Long-term contracts', 'Advanced analytics', 'SLA-backed reliability', 'Embedded data teams'],
    },
    {
      phase: 'Phase 3',
      title: 'Data Intelligence Platform',
      description: 'Focus: Shared Assets & Sector Intelligence. Cross-institutional datasets and big data ventures.',
      items: ['Sector intelligence', 'Policy modeling', 'Advanced AI/ML', 'Data partnerships'],
    },
  ];

  const differentiators = [
    {
      title: 'Not a BI Shop',
      body: "We don't just build dashboards. We architect the entire data operating system beneath them.",
    },
    {
      title: 'Not a Cloud Reseller',
      body: 'We specialize in the hardest part: sovereign data architecture and automation engineering.',
    },
    {
      title: 'The Trusted Point of Contact',
      body: 'We sit quietly but powerfully between raw data and institutional decisions—owning the responsibility for both.',
    },
  ];

  return (
    <>
      <Hero
        title="About Metis"
        subtitle="The Company"
        description="Metis is a data custodian and partner that designs, builds, and safeguards data infrastructures while transforming data into long-term institutional value."
      />

      <PageSection>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.35rem', md: '1.75rem' } }}>
              Who We Are
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
              Metis is a pure data and automation company. We don&apos;t sell IT support. We don&apos;t sell generic software. We build data operating systems with embedded automation.
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
              We work where data, software, and decision-making meet. Our mission: to help organizations—NGOs, SMEs, corporations, and governments—transform data from a liability into a strategic asset.
            </Typography>
            <CustomButton href="/services" variant="contained">Learn Our Approach</CustomButton>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.35rem', md: '1.75rem' } }}>
              What Sets Us Apart
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {differentiators.map((item) => (
                <Box key={item.title}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.body}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </PageSection>

      <PageSection>
        <SectionHeading
          title="Our Core Values"
          description="The principles that guide everything we build"
        />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {coreValues.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={value.title}>
              <StatsCard
                icon={value.icon}
                label={value.title}
                description={value.description}
                color={accentAt(index)}
              />
            </Grid>
          ))}
        </Grid>
      </PageSection>

      <PageSection>
        <SectionHeading
          title="Our Evolution"
          description="From Foundation Builder to Data Intelligence Platform—a scalable path to institutional value"
        />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {phases.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.phase}>
              <StatsCard
                title={item.title}
                label={item.phase}
                description={item.description}
                features={item.items}
                color={accentAt(index)}
              />
            </Grid>
          ))}
        </Grid>
      </PageSection>

      <Box sx={{ bgcolor: 'var(--surface)', py: { xs: 5, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <SectionHeading title="Built to Be Trusted" />
        <Grid container spacing={3} sx={{ maxWidth: 900, mx: 'auto' }}>
          {[
            { title: 'Secure by Design', body: "Security isn't an afterthought. It's embedded into every layer of our systems." },
            { title: 'Clear Data Ownership', body: "Your data is yours. We don't monetize it. We protect and empower it." },
            { title: 'Long-term Reliability', body: 'We think in years, not quarters. Your data infrastructure evolves with your needs.' },
          ].map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: accentAt(index), mb: 1, fontSize: '1.05rem' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
