import { Box, Container, Grid, Typography } from '@mui/material';
import { EventNoteOutlined, GroupsOutlined, InsightsOutlined } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import Hero from '@/components/hero';
import type { Service } from '@/lib/supabase/types';
import ConsultationForm from './_components/consultation-form';

export const metadata = { title: 'Book a consultation · Metis Analytica' };

export default async function ConsultationPage() {
  const supabase = await createSupabaseServerClient();
  const { profile } = await getCurrentUserAndProfile();

  const { data: services } = await supabase
    .from('services')
    .select('slug, title')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  const highlights = [
    {
      icon: <EventNoteOutlined sx={{ fontSize: 28 }} />,
      title: '45-min working session',
      description: 'We deep-dive into your data landscape, systems, and target outcomes.',
    },
    {
      icon: <GroupsOutlined sx={{ fontSize: 28 }} />,
      title: 'Right people in the room',
      description: 'Solutions architect + analytics lead, matched to your sector.',
    },
    {
      icon: <InsightsOutlined sx={{ fontSize: 28 }} />,
      title: 'Actionable next steps',
      description: 'You leave with a written brief: quick wins, risks, and a recommended path.',
    },
  ];

  return (
    <>
      <Hero
        title="Book a Consultation"
        subtitle="Free · 45 minutes"
        description="Tell us where you are and where you want to be with your data. We'll come back within 24 hours to schedule the call."
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
                What to expect
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {highlights.map((h) => (
                  <Box key={h.title} sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        color: '#000',
                        flexShrink: 0,
                      }}
                    >
                      {h.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#000' }}>
                        {h.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                        {h.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2 }}>
                Request your session
              </Typography>
              <ConsultationForm
                services={services ?? []}
                prefill={profile ? { name: profile.full_name ?? '', email: profile.email, organization: profile.organization } : undefined}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
