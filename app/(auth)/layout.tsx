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
          'linear-gradient(135deg, rgba(25, 118, 210, 0.06) 0%, rgba(220, 0, 78, 0.06) 100%)',
        py: { xs: 4, sm: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 3, m: 'auto', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/" style={{ display: 'inline-flex' }}>
            <Box sx={{ position: 'relative', width: 200, height: 48 }}>
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
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(8px)',
            background: 'rgba(255,255,255,0.9)',
          }}
        >
          {children}
        </Paper>

        <Typography variant="caption" sx={{ color: '#666', textAlign: 'center' }}>
          © {new Date().getFullYear()} Metis Analytica · Reliable Data. Smarter Operations.
        </Typography>
      </Container>
    </Box>
  );
}
