'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Alert, Box, Stack, TextField, Typography } from '@mui/material';
import CustomButton from '@/components/button';
import { registerAction, type AuthState } from '@/app/actions/auth';

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(registerAction, null);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#000' }}>
        Create your account
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
        Join Metis to book consultations, apply to roles, and manage feedback.
      </Typography>

      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}

      <form action={formAction}>
        <Stack spacing={2.5}>
          <TextField label="Full name" name="full_name" required autoComplete="name" fullWidth />
          <TextField label="Email" name="email" type="email" required autoComplete="email" fullWidth />
          <TextField
            label="Password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            fullWidth
            helperText="At least 8 characters."
          />
          <TextField
            label="Confirm password"
            name="confirm"
            type="password"
            required
            autoComplete="new-password"
            fullWidth
          />
          <CustomButton type="submit" variant="contained" disabled={pending} fullWidth>
            {pending ? 'Creating account…' : 'Create account'}
          </CustomButton>
        </Stack>
      </form>

      <Typography variant="body2" sx={{ color: '#666', mt: 3, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: '#000', fontWeight: 600 }}>
          Sign in
        </Link>
      </Typography>
    </Box>
  );
}
