import { Box, Container } from '@mui/material';
import type { ReactNode, ElementType } from 'react';

interface PageSectionProps {
  children: ReactNode;
  muted?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
  component?: ElementType;
  id?: string;
  offsetNav?: boolean;
}

export default function PageSection({
  children,
  muted = false,
  maxWidth = 'lg',
  component = 'section',
  id,
  offsetNav = false,
}: PageSectionProps) {
  return (
    <Box
      component={component}
      id={id}
      sx={{
        py: { xs: 5, sm: 7, md: 10 },
        pt: offsetNav ? { xs: 'calc(var(--nav-offset) + 1.5rem)', md: 'calc(var(--nav-offset) + 2.5rem)' } : undefined,
        bgcolor: muted ? 'var(--surface)' : 'transparent',
      }}
    >
      <Container maxWidth={maxWidth} disableGutters={false} sx={{ px: { xs: 2, sm: 3 } }}>
        {children}
      </Container>
    </Box>
  );
}
