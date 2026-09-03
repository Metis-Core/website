import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Chip, Container, Divider, Grid, Typography } from '@mui/material';
import { LocationOn, WorkOutline, ArrowBack, CheckCircleOutline } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import type { CareerPosition } from '@/lib/supabase/types';
import ApplyForm from './_components/apply-form';

const TYPE_LABEL: Record<CareerPosition['type'], string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('career_positions').select('title').eq('slug', slug).maybeSingle();
  return { title: data?.title ? `${data.title} · Careers · Metis Analytica` : 'Careers · Metis Analytica' };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { profile } = await getCurrentUserAndProfile();

  const { data: position } = await supabase
    .from('career_positions')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle<CareerPosition>();

  if (!position) notFound();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 3, mt: { xs: 6, md: 8 } }}>
        <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none' }}>
          <ArrowBack sx={{ fontSize: 18 }} /> All roles
        </Link>
      </Box>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {position.department && (
              <Chip label={position.department} size="small" sx={{ bgcolor: '#000', color: '#fff', fontWeight: 700 }} />
            )}
            <Chip label={TYPE_LABEL[position.type]} size="small" variant="outlined" />
            <Chip icon={<LocationOn sx={{ fontSize: 14 }} />} label={position.location} size="small" variant="outlined" />
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            {position.title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 4, fontSize: '1.08rem' }}>
            {position.description}
          </Typography>

          {position.responsibilities.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2 }}>
                What you&apos;ll do
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {position.responsibilities.map((r) => (
                  <Box key={r} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <CheckCircleOutline sx={{ color: '#00897b', fontSize: 22, mt: 0.25, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: '#333' }}>{r}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {position.requirements.length > 0 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2 }}>
                What we&apos;re looking for
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {position.requirements.map((r) => (
                  <Box key={r} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <CheckCircleOutline sx={{ color: '#dc004e', fontSize: 22, mt: 0.25, flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: '#333' }}>{r}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: { md: 'sticky' },
              top: { md: 100 },
              p: { xs: 3, md: 4 },
              borderRadius: '16px',
              backgroundColor: '#f9f9f9',
              border: '1px solid #e0e0e0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <WorkOutline sx={{ color: '#000' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>
                Apply for this role
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <ApplyForm
              positionId={position.id}
              prefill={profile ? { fullName: profile.full_name ?? '', email: profile.email } : undefined}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
