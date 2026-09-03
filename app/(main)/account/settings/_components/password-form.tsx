'use client';

import { useActionState } from 'react';
import { Alert, Stack, TextField } from '@mui/material';
import CustomButton from '@/components/button';
import { updatePasswordAction, type FormState } from '@/app/actions/profile';

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(updatePasswordAction, null);

  return (
    <form action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}

      <Stack spacing={2.5}>
        <TextField label="New password" name="password" type="password" required autoComplete="new-password" fullWidth />
        <TextField label="Confirm new password" name="confirm" type="password" required autoComplete="new-password" fullWidth />
        <div>
          <CustomButton type="submit" variant="contained" disabled={pending}>
            {pending ? 'Updating…' : 'Update password'}
          </CustomButton>
        </div>
      </Stack>
    </form>
  );
}
