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
import { ICON_OPTIONS } from '@/components/dynamic-icon';
import type { Service } from '@/lib/supabase/types';
import type { FormState } from '@/app/actions/catalog';

export default function ServiceForm({
  service,
  action,
  submitLabel,
}: {
  service?: Service;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}

      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
          <TextField label="Title" name="title" required defaultValue={service?.title ?? ''} fullWidth />
          <TextField
            label="Slug"
            name="slug"
            defaultValue={service?.slug ?? ''}
            fullWidth
            helperText="Leave empty to auto-generate from title."
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
          <TextField label="Layer (e.g. Layer 1)" name="layer" defaultValue={service?.layer ?? ''} fullWidth />
          <TextField label="Subtitle" name="subtitle" defaultValue={service?.subtitle ?? ''} fullWidth />
          <TextField
            label="Sort order"
            name="sort_order"
            type="number"
            defaultValue={service?.sort_order ?? 0}
            fullWidth
          />
        </Box>
        <TextField
          label="Description"
          name="description"
          required
          multiline
          minRows={3}
          defaultValue={service?.description ?? ''}
          fullWidth
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField select label="Icon" name="icon" defaultValue={service?.icon ?? ''} fullWidth>
            <MenuItem value="">(none)</MenuItem>
            {ICON_OPTIONS.map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Color (hex)"
            name="color"
            defaultValue={service?.color ?? '#737373'}
            fullWidth
            slotProps={{ input: { sx: { fontFamily: 'monospace' } } }}
          />
        </Box>
        <TextField
          label="Capabilities (one per line)"
          name="capabilities"
          multiline
          minRows={4}
          defaultValue={service?.capabilities.join('\n') ?? ''}
          fullWidth
          helperText="Bullet points shown under the service."
        />
        <TextField
          label="Industries (one per line)"
          name="industries"
          multiline
          minRows={2}
          defaultValue={service?.industries.join('\n') ?? ''}
          fullWidth
        />
        <FormControlLabel
          control={<Switch name="is_active" defaultChecked={service?.is_active ?? true} />}
          label={<Typography variant="body2">Active (visible on public site)</Typography>}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <CustomButton type="submit" variant="contained" disabled={pending}>
            {pending ? 'Saving…' : submitLabel}
          </CustomButton>
          <CustomButton component={Link} href="/admin/services" variant="outlined">
            Cancel
          </CustomButton>
        </Box>
      </Stack>
    </form>
  );
}
