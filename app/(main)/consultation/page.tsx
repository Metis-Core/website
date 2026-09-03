import { Box, Container, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import Hero from '@/components/hero';
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

  return (
    <>
      <Hero
        title="Book a Consultation"
        description="Tell us where you are and where you want to be with your data. We'll come back within 24 hours to schedule the call."
      />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '14px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2 }}>
            Request your session
          </Typography>
          <ConsultationForm
            services={services ?? []}
            prefill={
              profile
                ? { name: profile.full_name ?? '', email: profile.email, organization: profile.organization }
                : undefined
            }
          />
        </Box>
      </Container>
    </>
  );
}
