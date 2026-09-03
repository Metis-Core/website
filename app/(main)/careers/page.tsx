import Link from 'next/link';
import { Box, Card, Chip, Container, Grid, Typography } from '@mui/material';
import { LocationOn, WorkOutline, ArrowForward, EmojiPeople } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import Hero from '@/components/hero';
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

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000', mb: 1 }}>
            Open positions
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            {list.length === 0 ? 'No roles open right now — check back soon or send us a note.' : `${list.length} role${list.length === 1 ? '' : 's'} open${departments.length ? ` across ${departments.length} team${departments.length === 1 ? '' : 's'}` : ''}.`}
          </Typography>
        </Box>

        {list.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center', borderRadius: '16px', backgroundColor: '#f9f9f9' }}>
            <EmojiPeople sx={{ fontSize: 48, color: '#737373', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              We&apos;re always meeting exceptional people.
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Send a note to <a href="mailto:careers@metis.com" style={{ color: '#000', fontWeight: 600 }}>careers@metis.com</a>.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {list.map((p) => (
              <Grid size={{ xs: 12, md: 6 }} key={p.id}>
                <Card
                  component={Link}
                  href={`/careers/${p.slug}`}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    p: 3,
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    '&:hover': {
                      borderColor: '#000',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    {p.department && <Chip label={p.department} size="small" sx={{ bgcolor: '#000', color: '#fff', fontWeight: 700 }} />}
                    <Chip label={TYPE_LABEL[p.type]} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 1 }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.6 }}>
                    {p.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                      <LocationOn sx={{ fontSize: 16 }} />
                      <Typography variant="body2">{p.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#000', fontWeight: 700 }}>
                      <Typography variant="body2">View role</Typography>
                      <ArrowForward sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 8, p: 4, borderRadius: '12px', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
          <WorkOutline sx={{ fontSize: 40, color: '#737373', mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Don&apos;t see the right role?
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Introduce yourself at <a href="mailto:careers@metis.com" style={{ color: '#000', fontWeight: 600 }}>careers@metis.com</a>. We keep a light bench and hire senior people opportunistically.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
