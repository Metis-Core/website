import { Box, Container, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface CtaBandProps {
  title: string;
  description?: string;
  actions: ReactNode;
}

export default function CtaBand({ title, description, actions }: CtaBandProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--surface)',
        py: { xs: 5, md: 8 },
        mb: 0,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', px: { xs: 2, sm: 3 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 700,
            color: 'text.primary',
            mb: description ? 1.5 : 3,
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            sx={{
              color: 'text.secondary',
              mb: 3,
              fontSize: { xs: '0.95rem', md: '1.0625rem' },
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            '& > *': { width: { xs: '100%', sm: 'auto' } },
          }}
        >
          {actions}
        </Stack>
      </Container>
    </Box>
  );
}
