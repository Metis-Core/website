'use client';

import { FC } from 'react';
import { useActionState } from 'react';
import { Alert, Box, Stack, TextField } from '@mui/material';
import CustomButton from './button';
import PhoneInput from './phone-input';
import { sendContactMessageAction, type FormState } from '@/app/actions/contact';

interface ContactFormProps {
  prefill?: { name?: string; email?: string; phone?: string | null };
}

const ContactForm: FC<ContactFormProps> = ({ prefill }) => {
  const [state, formAction, pending] = useActionState<FormState, FormData>(sendContactMessageAction, null);

  return (
    <Box component="form" action={formAction}>
      {state?.error && <Alert severity="error" sx={{ mb: 3 }}>{state.error}</Alert>}
      {state?.success && <Alert severity="success" sx={{ mb: 3 }}>{state.success}</Alert>}

      <Stack spacing={3}>
        <TextField
          label="Your Name"
          name="name"
          defaultValue={prefill?.name ?? ''}
          fullWidth
          variant="outlined"
          required
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          defaultValue={prefill?.email ?? ''}
          fullWidth
          variant="outlined"
          required
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <PhoneInput name="phone" label="Phone number" required defaultValue={prefill?.phone ?? undefined} />
        <TextField
          label="Subject"
          name="subject"
          fullWidth
          variant="outlined"
          required
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <TextField
          label="Message"
          name="message"
          fullWidth
          variant="outlined"
          multiline
          rows={5}
          required
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        <Box sx={{ pt: 2 }}>
          <CustomButton
            type="submit"
            fullWidth
            disabled={pending}
            sx={{ py: 1.5, fontSize: '1rem' }}
          >
            {pending ? 'Sending…' : 'Send Message'}
          </CustomButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactForm;
