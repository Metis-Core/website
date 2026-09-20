import { Box, Typography } from '@mui/material';
import Hero from '@/components/hero';
import PageSection from '@/components/page-section';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import FeedbackForm from './_components/feedback-form';

export const metadata = { title: 'Feedback · Metis Analytica' };

export default async function FeedbackPage() {
  const { profile } = await getCurrentUserAndProfile();

  return (
    <>
      <Hero
        title="Share Your Feedback"
        subtitle="We're listening"
        description="Every message helps us build better data systems. Tell us what's working, what's not, and what should exist."
      />

      <PageSection maxWidth="md">
        <Box sx={{ p: { xs: 2.5, md: 4 }, borderRadius: '12px', bgcolor: 'var(--surface)' }}>
          <Typography component="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.2rem', md: '1.4rem' } }}>
            Your feedback
          </Typography>
          <FeedbackForm
            prefill={profile ? { name: profile.full_name ?? '', email: profile.email } : undefined}
          />
        </Box>
      </PageSection>
    </>
  );
}
