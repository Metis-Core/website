'use client';

import { useActionState } from 'react';
import { Alert, Box, MenuItem, Stack, TextField } from '@mui/material';
import CustomButton from '@/components/button';
import PhoneInput from '@/components/phone-input';
import { bookConsultationAction, type FormState } from '@/app/actions/consultation';
import type { Service } from '@/lib/supabase/types';

const SECTORS = ['NGO / Non-profit', 'SME', 'Corporation', 'Government / Public sector', 'Other'];

export default function ConsultationForm({
  services,
  prefill,
}: {
  services: Pick<Service, 'slug' | 'title'>[];
  prefill?: { name?: string; email?: string; organization?: string | null; phone?: string | null };
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(bookConsultationAction, null);

  return (
    <form action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}

      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Full name" name="name" required defaultValue={prefill?.name ?? ''} fullWidth />
          <TextField label="Work email" name="email" type="email" required defaultValue={prefill?.email ?? ''} fullWidth />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <PhoneInput name="phone" label="Phone number" required defaultValue={prefill?.phone ?? undefined} />
          <TextField label="Organization" name="organization" defaultValue={prefill?.organization ?? ''} fullWidth />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField select label="Sector" name="sector" defaultValue="" fullWidth>
            <MenuItem value="">Select…</MenuItem>
            {SECTORS.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <TextField select label="Service of interest" name="service_interest" defaultValue="" fullWidth>
            <MenuItem value="">Any / not sure yet</MenuItem>
            {services.map((s) => (
              <MenuItem key={s.slug} value={s.slug}>{s.title}</MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField
          type="date"
          label="Preferred date"
          name="preferred_date"
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
        <TextField
          label="What do you need help with?"
          name="message"
          required
          multiline
          minRows={4}
          fullWidth
          placeholder="Tell us about your current data setup and where you want to be in 6–12 months."
        />
        <CustomButton type="submit" variant="contained" disabled={pending}>
          {pending ? 'Sending…' : 'Book consultation'}
        </CustomButton>
      </Stack>
    </form>
  );
}
