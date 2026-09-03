import { Alert, Box } from '@mui/material';
import LoginFormClient from './_components/login-form-client';

export const metadata = { title: 'Sign in · Metis Analytica' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; registered?: string }>;
}) {
  const { next: rawNext, registered } = await searchParams;
  const next = rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/account';

  return (
    <Box>
      {registered && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Account created. Sign in below to get started.
        </Alert>
      )}
      <LoginFormClient next={next} />
    </Box>
  );
}
