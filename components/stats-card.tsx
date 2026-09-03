'use client';

import { ReactNode } from 'react';
import { Box, Chip, Paper, Typography } from '@mui/material';
import { AnimatedStat } from '@/components/motion-primitives/animated-stat';

interface StatsCardProps {
  number?: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  details?: string | ReactNode;
  features?: string[];
  color?: string;
  cta?: {
    text: string;
    onClick?: () => void;
  };
}

function parseNumber(raw: string): number | null {
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

const StatsCard: React.FC<StatsCardProps> = ({
  number,
  label,
  description,
  icon,
  title,
  subtitle,
  features,
  color = '#737373',
}) => {
  const displayTitle = title ?? label;
  const supportText = subtitle ?? description;
  const numericValue = number ? parseNumber(number) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        height: '100%',
        minHeight: { xs: 148, sm: 176 },
        p: { xs: 2, sm: 2.5 },
        borderRadius: '14px',
        border: '1px solid',
        borderColor: `${color}33`,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
          borderColor: color,
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: color,
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minHeight: { xs: 40, sm: 44 } }}>
        {icon && (
          <Box
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              flexShrink: 0,
              borderRadius: '10px',
              backgroundColor: `${color}15`,
              color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > svg': { fontSize: { xs: 20, sm: 22 } },
            }}
          >
            {icon}
          </Box>
        )}
        {numericValue != null && (
          <Box
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem' },
              fontWeight: 800,
              lineHeight: 1,
              color,
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            <AnimatedStat value={numericValue} color={color} />
          </Box>
        )}
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          color: '#000',
          fontWeight: 700,
          fontSize: { xs: '0.9rem', sm: '0.95rem' },
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {displayTitle}
      </Typography>

      {supportText && (
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontSize: { xs: '0.78rem', sm: '0.82rem' },
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {supportText}
        </Typography>
      )}

      {features && features.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto', pt: 1 }}>
          {features.slice(0, 3).map((f) => (
            <Chip
              key={f}
              label={f}
              size="small"
              sx={{
                bgcolor: `${color}12`,
                color: '#333',
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
          ))}
          {features.length > 3 && (
            <Chip
              label={`+${features.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 22, borderColor: `${color}55`, color: '#666' }}
            />
          )}
        </Box>
      )}
    </Paper>
  );
};

export default StatsCard;
