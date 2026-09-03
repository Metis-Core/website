import { Box } from '@mui/material';
import LoginFormClient from './_components/login-form-client';

export const metadata = { title: 'Sign in · Metis Analytica' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next: rawNext } = await searchParams;
  const next = rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/account';

  return (
    <Box>
      <LoginFormClient next={next} />
    </Box>
  );
}
