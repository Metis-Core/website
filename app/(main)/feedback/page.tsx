import { Box, Container, Typography } from '@mui/material';
import Hero from '@/components/hero';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import FeedbackForm from './_components/feedback-form';

export const metadata = { title: 'Feedback · Metis Analytica' };

export default async function FeedbackPage() {
  const { profile } = await getCurrentUserAndProfile();

  return (
    <>
      <Hero
        title="Share Your Feedback"
        subtitle="We&apos;re listening"
        description="Every message helps us build better data systems. Tell us what's working, what's not, and what should exist."
      />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2 }}>
            Your feedback
          </Typography>
          <FeedbackForm
            prefill={profile ? { name: profile.full_name ?? '', email: profile.email } : undefined}
          />
        </Box>
      </Container>
    </>
  );
}
