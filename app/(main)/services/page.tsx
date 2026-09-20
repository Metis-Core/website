import { Box, Chip, Grid, Typography, Card } from '@mui/material';
import {
  BusinessOutlined,
  PeopleOutlined,
  BuildOutlined,
  PublicOutlined,
} from '@mui/icons-material';
import Hero from '@/components/hero';
import StatsCard from '@/components/stats-card';
import CustomButton from '@/components/button';
import PageSection from '@/components/page-section';
import SectionHeading from '@/components/section-heading';
import CtaBand from '@/components/cta-band';
import { DynamicIcon } from '@/components/dynamic-icon';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { accentAt } from '@/lib/brand';
import type { Service } from '@/lib/supabase/types';

export const metadata = { title: 'Services · Metis Analytica' };

const segments = [
  {
    name: 'NGOs & Non-Profits',
    icon: <PeopleOutlined sx={{ fontSize: 32 }} />,
    use_cases: [
      'Program impact tracking',
      'Beneficiary management at scale',
      'Grant reporting automation',
      'Operational efficiency',
    ],
  },
  {
    name: 'SMEs & Growing Companies',
    icon: <BuildOutlined sx={{ fontSize: 32 }} />,
    use_cases: [
      'Sales & revenue analytics',
      'Inventory & supply chain',
      'Customer data platforms',
      'Financial forecasting',
    ],
  },
  {
    name: 'Corporations & Large Enterprises',
    icon: <BusinessOutlined sx={{ fontSize: 32 }} />,
    use_cases: [
      'Business intelligence platforms',
      'Cross-department data lakes',
      'Real-time operational dashboards',
      'Advanced forecasting',
    ],
  },
  {
    name: 'Government & Public Sector',
    icon: <PublicOutlined sx={{ fontSize: 32 }} />,
    use_cases: [
      'Policy evidence & evaluation',
      'Service delivery optimization',
      'Public sector analytics',
      'Compliance & reporting',
    ],
  },
];

const process = [
  { step: '01', title: 'Understand', description: 'We audit your current state: systems, data, processes, pain points.' },
  { step: '02', title: 'Design', description: 'We architect a data operating system tailored to your specific needs and ambitions.' },
  { step: '03', title: 'Build', description: 'We implement infrastructure, systems, and automation with your team embedded.' },
  { step: '04', title: 'Optimize', description: 'We continuously refine performance, security, and impact.' },
  { step: '05', title: 'Evolve', description: 'We upgrade your systems as your institution grows and markets change.' },
  { step: '06', title: 'Partner', description: 'We transition from project to long-term managed partnership.' },
];

export default async function Services() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  const layers = (data ?? []) as Service[];

  return (
    <>
      <Hero
        title="Our Services"
        subtitle="The 4-Layer Data Operating System"
        description="From infrastructure to intelligence—Metis builds the complete data stack your institution needs to compete and grow."
      >
        <CustomButton href="/consultation" variant="contained">
          Book a Consultation
        </CustomButton>
        <CustomButton href="/contact" variant="outlined">
          Talk to Sales
        </CustomButton>
      </Hero>

      <PageSection>
        <SectionHeading title="Why a Layered Approach?" />
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1.05rem' }, textAlign: 'center', mb: 3, maxWidth: 720, mx: 'auto' }}>
          Most data companies specialize in one layer. We specialize in all of them:
        </Typography>
        <Grid container spacing={2}>
          {[
            'No vendor lock-in from missing layers',
            'Seamless integration across your entire stack',
            'One trusted point of contact from infrastructure to insights',
          ].map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, textAlign: 'center' }}>
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </PageSection>

      <PageSection>
        {layers.map((layer) => (
          <Box
            key={layer.id}
            sx={{
              mb: { xs: 3, md: 4 },
              p: { xs: 2.5, md: 4 },
              borderRadius: '12px',
              border: `1.5px solid ${layer.color}`,
              backgroundColor: `${layer.color}0a`,
            }}
          >
            <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Grid size={{ xs: 12, md: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, color: layer.color }}>
                  <DynamicIcon name={layer.icon} sx={{ fontSize: 40 }} />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 11 }}>
                {layer.layer && (
                  <Chip
                    label={layer.layer}
                    sx={{
                      backgroundColor: layer.color,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      mb: 1,
                    }}
                  />
                )}
                <Typography component="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.15rem', md: '1.4rem' } }}>
                  {layer.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                  {layer.description}
                </Typography>

                {layer.capabilities.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      What We Deliver:
                    </Typography>
                    <Grid container spacing={1}>
                      {layer.capabilities.map((cap) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={cap}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: layer.color,
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {cap}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </PageSection>

      <PageSection>
        <SectionHeading
          title="Market Segments We Serve"
          description="Every sector faces similar data challenges. We customize our support for unique needs."
        />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {segments.map((segment, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={segment.name}>
              <StatsCard
                icon={segment.icon}
                label={segment.name}
                description="Common Use Cases"
                features={segment.use_cases}
                color={accentAt(index)}
              />
            </Grid>
          ))}
        </Grid>
      </PageSection>

      <PageSection>
        <SectionHeading
          title="Our Service Process"
          description="From discovery to partnership"
        />
        <Grid container spacing={2}>
          {process.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.step}>
              <Card sx={{ p: { xs: 2.5, md: 3 }, textAlign: 'center', height: '100%', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  {item.step}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.05rem' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PageSection>

      <CtaBand
        title="Ready to Transform Your Data?"
        description="Let's discuss which layers of our data operating system your institution needs."
        actions={
          <CustomButton href="/consultation" variant="contained">
            Book a Consultation
          </CustomButton>
        }
      />
    </>
  );
}
