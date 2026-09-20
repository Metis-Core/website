import { Box, Chip, Grid, Typography } from '@mui/material';
import { LocationOn, WorkOutline, ArrowForward, EmojiPeople } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import Hero from '@/components/hero';
import PageSection from '@/components/page-section';
import SectionHeading from '@/components/section-heading';
import { LinkCard } from '@/components/link-wrappers';
import type { CareerPosition } from '@/lib/supabase/types';

export const metadata = { title: 'Careers · Metis Analytica' };

const TYPE_LABEL: Record<CareerPosition['type'], string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
};

export default async function CareersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: positions } = await supabase
    .from('career_positions')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  const list = (positions ?? []) as CareerPosition[];
  const departments = Array.from(new Set(list.map((p) => p.department).filter(Boolean))) as string[];

  return (
    <>
      <Hero
        title="Build the data foundations of tomorrow"
        subtitle="Careers at Metis"
        description="We're a small, senior team building sovereign data infrastructure for institutions in emerging markets. Join us."
      />

      <PageSection>
        <SectionHeading
          title="Open positions"
          description={
            list.length === 0
              ? 'No roles open right now — check back soon or send us a note.'
              : `${list.length} role${list.length === 1 ? '' : 's'} open${departments.length ? ` across ${departments.length} team${departments.length === 1 ? '' : 's'}` : ''}.`
          }
        />

        {list.length === 0 ? (
          <Box sx={{ p: { xs: 3, md: 6 }, textAlign: 'center', borderRadius: '16px', bgcolor: 'var(--surface)' }}>
            <EmojiPeople sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              We&apos;re always meeting exceptional people.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Send a note to{' '}
              <a href="mailto:careers@metisanalytica.com" style={{ fontWeight: 600 }}>
                careers@metisanalytica.com
              </a>
              .
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {list.map((p) => (
              <Grid size={{ xs: 12, md: 6 }} key={p.id}>
                <LinkCard
                  href={`/careers/${p.slug}`}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    p: { xs: 2.5, md: 3 },
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    height: '100%',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 'var(--shadow-md)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    {p.department && (
                      <Chip label={p.department} size="small" sx={{ bgcolor: 'secondary.main', color: '#fff', fontWeight: 700 }} />
                    )}
                    <Chip label={TYPE_LABEL[p.type]} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.15rem', md: '1.4rem' } }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                    {p.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', minWidth: 0 }}>
                      <LocationOn sx={{ fontSize: 16, flexShrink: 0 }} />
                      <Typography variant="body2" noWrap>{p.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 700, flexShrink: 0 }}>
                      <Typography variant="body2">View role</Typography>
                      <ArrowForward sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>
                </LinkCard>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: { xs: 4, md: 6 }, p: { xs: 3, md: 4 }, borderRadius: '12px', bgcolor: 'var(--surface)', textAlign: 'center' }}>
          <WorkOutline sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Don&apos;t see the right role?
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Introduce yourself at{' '}
            <a href="mailto:careers@metisanalytica.com" style={{ fontWeight: 600 }}>
              careers@metisanalytica.com
            </a>
            . We keep a light bench and hire senior people opportunistically.
          </Typography>
        </Box>
      </PageSection>
    </>
  );
}
