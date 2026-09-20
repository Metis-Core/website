'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { brand } from '@/lib/brand';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  color?: string;
  href?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  boxShadow: 'var(--shadow-sm)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-md)',
    borderColor: theme.palette.primary.main,
  },
}));

const FeatureCard: FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = brand.accentBlue,
  href,
}) => {
  const content = (
    <StyledCard>
      {icon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: '12px',
            backgroundColor: `${color}1f`,
            color,
            mx: 'auto',
            mt: 3,
            mb: 1,
          }}
        >
          {icon}
        </Box>
      )}
      <CardContent sx={{ textAlign: 'center', px: { xs: 2, sm: 3 }, pb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary', fontSize: { xs: '1rem', md: '1.125rem' } }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {content}
      </Link>
    );
  }

  return content;
};

export default FeatureCard;
