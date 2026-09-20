import { Box, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import Hero from '@/components/hero';
import PageSection from '@/components/page-section';
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

      <PageSection maxWidth="md">
        <Box sx={{ p: { xs: 2.5, md: 4 }, borderRadius: '14px', bgcolor: 'var(--surface)' }}>
          <Typography component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.2rem', md: '1.4rem' } }}>
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
      </PageSection>
    </>
  );
}
