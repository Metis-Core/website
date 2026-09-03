'use client';

import { FC, ReactNode } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  color?: string;
  href?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)',
    borderColor: theme.palette.primary.main,
  },
}));

const FeatureCard: FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = '#737373',
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
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            backgroundColor: `${color}20`,
            color,
            mx: 'auto',
            mt: 3,
            mb: 2,
            fontSize: '32px',
          }}
        >
          {icon}
        </Box>
      )}
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#000' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }

  return content;
};

export default FeatureCard;
