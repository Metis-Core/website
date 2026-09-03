'use client';

import { useActionState } from 'react';
import { Alert, Box, Stack, TextField } from '@mui/material';
import CustomButton from '@/components/button';
import PhoneInput from '@/components/phone-input';
import { updateProfileAction, type FormState } from '@/app/actions/profile';
import type { Profile } from '@/lib/supabase/types';

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(updateProfileAction, null);

  return (
    <form action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}

      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Full name" name="full_name" required defaultValue={profile.full_name ?? ''} fullWidth />
          <TextField label="Email" value={profile.email} disabled fullWidth helperText="Contact support to change your email." />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <PhoneInput name="phone" label="Phone" defaultValue={profile.phone ?? undefined} />
          <TextField label="Organization" name="organization" defaultValue={profile.organization ?? ''} fullWidth />
        </Box>
        <TextField label="Short bio" name="bio" defaultValue={profile.bio ?? ''} multiline minRows={3} fullWidth />
        <Box>
          <CustomButton type="submit" variant="contained" disabled={pending}>
            {pending ? 'Saving…' : 'Save changes'}
          </CustomButton>
        </Box>
      </Stack>
    </form>
  );
}
