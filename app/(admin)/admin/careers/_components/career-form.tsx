'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import {
  Alert,
  Box,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import CustomButton from '@/components/button';
import type { CareerPosition } from '@/lib/supabase/types';
import type { FormState } from '@/app/actions/catalog';

const TYPES: { value: CareerPosition['type']; label: string }[] = [
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

export default function CareerForm({
  career,
  action,
  submitLabel,
}: {
  career?: CareerPosition;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}

      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
          <TextField label="Job title" name="title" required defaultValue={career?.title ?? ''} fullWidth />
          <TextField
            label="Slug"
            name="slug"
            defaultValue={career?.slug ?? ''}
            fullWidth
            helperText="Leave empty to auto-generate."
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
          <TextField label="Department" name="department" defaultValue={career?.department ?? ''} fullWidth />
          <TextField
            label="Location"
            name="location"
            defaultValue={career?.location ?? 'Kampala, Uganda'}
            fullWidth
          />
          <TextField select label="Employment type" name="type" defaultValue={career?.type ?? 'full_time'} fullWidth>
            {TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField
          label="Description / summary"
          name="description"
          required
          multiline
          minRows={3}
          defaultValue={career?.description ?? ''}
          fullWidth
        />
        <TextField
          label="Responsibilities (one per line)"
          name="responsibilities"
          multiline
          minRows={5}
          defaultValue={career?.responsibilities.join('\n') ?? ''}
          fullWidth
        />
        <TextField
          label="Requirements (one per line)"
          name="requirements"
          multiline
          minRows={5}
          defaultValue={career?.requirements.join('\n') ?? ''}
          fullWidth
        />
        <FormControlLabel
          control={<Switch name="is_active" defaultChecked={career?.is_active ?? true} />}
          label={<Typography variant="body2">Active (visible on public careers page)</Typography>}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <CustomButton type="submit" variant="contained" disabled={pending}>
            {pending ? 'Saving…' : submitLabel}
          </CustomButton>
          <CustomButton href="/admin/careers" variant="outlined">
            Cancel
          </CustomButton>
        </Box>
      </Stack>
    </form>
  );
}
