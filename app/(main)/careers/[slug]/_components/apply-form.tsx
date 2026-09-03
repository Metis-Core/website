'use client';

import { useActionState } from 'react';
import { Alert, Box, Stack, TextField } from '@mui/material';
import CustomButton from '@/components/button';
import PhoneInput from '@/components/phone-input';
import FileUpload from '@/components/file-upload';
import CoverLetterInput from '@/components/cover-letter-input';
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

      <Stack spacing={3}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Full name" name="full_name" required defaultValue={prefill?.fullName ?? ''} fullWidth />
          <TextField label="Email" name="email" type="email" required defaultValue={prefill?.email ?? ''} fullWidth />
        </Box>
        <PhoneInput name="phone" label="Phone number" required defaultValue={prefill?.phone ?? undefined} />
        <FileUpload
          name="resume_url"
          endpoint="resumeUploader"
          label="Resume"
          helper="Upload your CV as PDF or Word document (max 8 MB)."
          hint="Recommended"
        />
        <CoverLetterInput textName="cover_letter" fileName="cover_letter_url" />
        <CustomButton type="submit" variant="contained" disabled={pending}>
          {pending ? 'Submitting…' : 'Submit application'}
        </CustomButton>
      </Stack>
    </form>
  );
}
