'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Alert, Box, Stack, TextField, Typography } from '@mui/material';
import CustomButton from '@/components/button';
import { requestPasswordResetAction, type AuthState } from '@/app/actions/auth';

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(requestPasswordResetAction, null);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#000' }}>
        Reset your password
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
        Enter your email and we&apos;ll send a link to reset your password.
      </Typography>

      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}

      <form action={formAction}>
        <Stack spacing={2.5}>
          <TextField label="Email" name="email" type="email" required autoComplete="email" fullWidth />
          <CustomButton type="submit" variant="contained" disabled={pending} fullWidth>
            {pending ? 'Sending…' : 'Send reset link'}
          </CustomButton>
        </Stack>
      </form>

      <Typography variant="body2" sx={{ color: '#666', mt: 3, textAlign: 'center' }}>
        Remembered it?{' '}
        <Link href="/login" style={{ color: '#000', fontWeight: 600 }}>
          Back to sign in
        </Link>
      </Typography>
    </Box>
  );
}
