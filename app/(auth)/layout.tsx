import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Paper, Typography } from '@mui/material';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'radial-gradient(circle at 15% 10%, rgba(74, 144, 217, 0.14), transparent 42%), radial-gradient(circle at 90% 90%, rgba(42, 95, 158, 0.1), transparent 46%), var(--background)',
        py: { xs: 4, sm: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 3, m: 'auto', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/" style={{ display: 'inline-flex' }}>
            <Box sx={{ position: 'relative', width: { xs: 168, sm: 200 }, height: { xs: 40, sm: 48 } }}>
              <Image
                src="/assets/PNG/LOGO%20DARK%20GREY.png"
                alt="Metis Analytica"
                fill
                sizes="200px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Link>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'var(--shadow-md)',
            bgcolor: 'background.paper',
          }}
        >
          {children}
        </Paper>

        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          © {new Date().getFullYear()} Metis Analytica · Reliable Data. Smarter Operations.
        </Typography>
      </Container>
    </Box>
  );
}
