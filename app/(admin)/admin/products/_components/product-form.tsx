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
import type { Product } from '@/lib/supabase/types';
import type { FormState } from '@/app/actions/catalog';

export default function ProductForm({
  product,
  action,
  submitLabel,
}: {
  product?: Product;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}

      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
          <TextField label="Title" name="title" required defaultValue={product?.title ?? ''} fullWidth />
          <TextField
            label="Slug"
            name="slug"
            defaultValue={product?.slug ?? ''}
            fullWidth
            helperText="Leave empty to auto-generate."
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
          <TextField label="Subtitle" name="subtitle" defaultValue={product?.subtitle ?? ''} fullWidth />
          <TextField
            label="Sort order"
            name="sort_order"
            type="number"
            defaultValue={product?.sort_order ?? 0}
            fullWidth
          />
        </Box>
        <TextField
          label="Description"
          name="description"
          required
          multiline
          minRows={3}
          defaultValue={product?.description ?? ''}
          fullWidth
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
          <TextField select label="Icon" name="icon" defaultValue={product?.icon ?? ''} fullWidth>
            <MenuItem value="">(none)</MenuItem>
            {ICON_OPTIONS.map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Color (hex)"
            name="color"
            defaultValue={product?.color ?? '#737373'}
            fullWidth
            slotProps={{ input: { sx: { fontFamily: 'monospace' } } }}
          />
          <TextField
            label="Link"
            name="link"
            defaultValue={product?.link ?? ''}
            fullWidth
            helperText="e.g. /products/metis-database"
          />
        </Box>
        <TextField
          label="Features (one per line)"
          name="features"
          multiline
          minRows={4}
          defaultValue={product?.features.join('\n') ?? ''}
          fullWidth
        />
        <FormControlLabel
          control={<Switch name="is_active" defaultChecked={product?.is_active ?? true} />}
          label={<Typography variant="body2">Active (visible on public site)</Typography>}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <CustomButton type="submit" variant="contained" disabled={pending}>
            {pending ? 'Saving…' : submitLabel}
          </CustomButton>
          <CustomButton href="/admin/products" variant="outlined">
            Cancel
          </CustomButton>
        </Box>
      </Stack>
    </form>
  );
}
