'use client';

import { FC, useState } from 'react';
import { Box, TextField, Stack, Alert } from '@mui/material';
import CustomButton from './button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Thank you for your message! We'll get back to you soon.
        </Alert>
      )}

      <Stack spacing={3}>
        <TextField
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        <TextField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          multiline
          rows={5}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />

        <Box sx={{ pt: 2 }}>
          <CustomButton
            type="submit"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5, fontSize: '1rem' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </CustomButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactForm;
