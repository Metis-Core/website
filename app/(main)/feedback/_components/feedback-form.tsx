'use client';

import { useActionState } from 'react';
import { Alert, Box, MenuItem, Rating, Stack, TextField, Typography } from '@mui/material';
import CustomButton from '@/components/button';
import { submitFeedbackAction, type FormState } from '@/app/actions/feedback';

const CATEGORIES = [
  { value: 'praise', label: 'Praise' },
  { value: 'bug', label: 'Bug / issue' },
  { value: 'feature', label: 'Feature request' },
  { value: 'question', label: 'Question' },
  { value: 'other', label: 'Other' },
] as const;

export default function FeedbackForm({
  prefill,
}: {
  prefill?: { name?: string; email?: string };
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(submitFeedbackAction, null);

  return (
    <form action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 2 }}>{state.success}</Alert>}

      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Your name" name="name" required defaultValue={prefill?.name ?? ''} fullWidth />
          <TextField label="Email" name="email" type="email" required defaultValue={prefill?.email ?? ''} fullWidth />
        </Box>
        <TextField select label="Category" name="category" defaultValue="praise" fullWidth>
          {CATEGORIES.map((c) => (
            <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
          ))}
        </TextField>
        <Box>
          <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>Rate your experience</Typography>
          <Rating name="rating" defaultValue={0} size="large" />
        </Box>
        <TextField
          label="Your feedback"
          name="message"
          required
          multiline
          minRows={4}
          fullWidth
          placeholder="What worked well? What didn't? Any ideas we should hear?"
        />
        <CustomButton type="submit" variant="contained" disabled={pending}>
          {pending ? 'Sending…' : 'Send feedback'}
        </CustomButton>
      </Stack>
    </form>
  );
}
