'use client';

import { FC, ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { brand } from '@/lib/brand';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  children,
  imageSrc,
  imageAlt = 'Hero image',
}) => {
  return (
    <Box
      data-nav-hero
      sx={{
        position: 'relative',
        pt: { xs: 'calc(var(--nav-offset) + 2rem)', md: 'calc(var(--nav-offset) + 3.5rem)' },
        pb: { xs: 5, sm: 8, md: 12 },
        background: backgroundImage
          ? `radial-gradient(circle at 15% 15%, rgba(74, 144, 217, 0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(42, 95, 158, 0.3), transparent 50%), linear-gradient(135deg, rgba(30, 32, 35, 0.95) 0%, rgba(20, 22, 26, 0.95) 100%), url(${backgroundImage})`
          : `radial-gradient(circle at 15% 15%, rgba(74, 144, 217, 0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(42, 95, 158, 0.3), transparent 50%), linear-gradient(135deg, ${brand.graphiteBlack} 0%, #14161a 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: imageSrc ? '1fr 1fr' : '1fr' }, gap: 3, alignItems: 'center' }}>
          <Box>
            {subtitle && (
              <Typography
                variant="overline"
                sx={{ color: brand.accentBlueLight, fontWeight: 700, fontSize: { xs: '0.75rem', md: '0.875rem' }, mb: 1, display: 'block' }}
              >
                {subtitle}
              </Typography>
            )}
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.25rem' },
                fontWeight: 700,
                mb: 1.5,
                lineHeight: 1.15,
                color: '#fff',
                textWrap: 'balance',
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                sx={{ fontSize: { xs: '0.95rem', md: '1.125rem' }, color: '#D1D5DB', mb: children ? 3 : 0, lineHeight: 1.6 }}
              >
                {description}
              </Typography>
            )}
            {children && (
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', '& > *': { width: { xs: '100%', sm: 'auto' } } }}>
                {children}
              </Box>
            )}
          </Box>

          {imageSrc && (
            <Box
              sx={{
                position: 'relative',
                display: { xs: 'none', md: 'block' },
                width: '100%',
                height: 360,
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
