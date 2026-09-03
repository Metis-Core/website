'use client';

import { FC, ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

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
      sx={{
        position: 'relative',
        py: { xs: 8, sm: 12, md: 16 },
        mt: 2,
        background: backgroundImage
          ? `linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%), url(${backgroundImage})`
          : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(220, 0, 78, 0.05) 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
          {/* Text Content */}
          <Box>
            {subtitle && (
              <Typography
                variant="overline"
                sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.875rem', mb: 1 }}
              >
                {subtitle}
              </Typography>
            )}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
                color: '#000',
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="body1"
                sx={{ fontSize: '1.125rem', color: '#666', mb: 4, lineHeight: 1.6 }}
              >
                {description}
              </Typography>
            )}
            {children && <Box>{children}</Box>}
          </Box>

          {/* Image */}
          {imageSrc && (
            <Box
              sx={{
                position: 'relative',
                display: { xs: 'none', md: 'block' },
                width: '100%',
                height: '400px',
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
