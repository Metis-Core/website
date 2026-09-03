'use client';

import { useActionState } from 'react';
import { Alert, Box, Stack, TextField } from '@mui/material';
import CustomButton from '@/components/button';
import PhoneInput from '@/components/phone-input';
import ResumeUpload from '@/components/resume-upload';
import { applyToPositionAction, type FormState } from '@/app/actions/careers';

export default function ApplyForm({
  positionId,
  prefill,
}: {
  positionId: string;
  prefill?: { fullName?: string; email?: string; phone?: string | null };
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(applyToPositionAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="position_id" value={positionId} />
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}

      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Full name" name="full_name" required defaultValue={prefill?.fullName ?? ''} fullWidth />
          <TextField label="Email" name="email" type="email" required defaultValue={prefill?.email ?? ''} fullWidth />
        </Box>
        <PhoneInput name="phone" label="Phone number" required defaultValue={prefill?.phone ?? undefined} />
        <ResumeUpload name="resume_url" />
        <TextField
          label="Cover letter"
          name="cover_letter"
          multiline
          minRows={5}
          placeholder="Tell us why this role and Metis, what you'd ship in the first 90 days, and anything else we should know."
          fullWidth
        />
        <CustomButton type="submit" variant="contained" disabled={pending}>
          {pending ? 'Submitting…' : 'Submit application'}
        </CustomButton>
      </Stack>
    </form>
  );
}
