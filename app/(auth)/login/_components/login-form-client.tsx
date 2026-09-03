'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Alert, Box, Stack, TextField, Typography } from '@mui/material';
import CustomButton from '@/components/button';
import { loginAction, type AuthState } from '@/app/actions/auth';

export default function LoginFormClient({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(loginAction, null);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#000' }}>
        Welcome back
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
        Log in to manage your consultations, feedback and account.
      </Typography>

      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}

      <form action={formAction}>
        <input type="hidden" name="next" value={next} />
        <Stack spacing={2.5}>
          <TextField label="Email" name="email" type="email" required autoComplete="email" fullWidth />
          <TextField
            label="Password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            fullWidth
          />
          <CustomButton type="submit" variant="contained" disabled={pending} fullWidth>
            {pending ? 'Signing in…' : 'Sign in'}
          </CustomButton>
        </Stack>
      </form>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          New here?{' '}
          <Link href="/register" style={{ color: '#000', fontWeight: 600 }}>
            Create account
          </Link>
        </Typography>
        <Link href="/forgot-password" style={{ color: '#666', fontSize: '0.875rem' }}>
          Forgot password?
        </Link>
      </Stack>
    </>
  );
}
