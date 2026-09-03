'use client';
import { useEffect, useState, ReactNode } from 'react';
import { AnimatedNumber } from '@/components/motion-primitives/animated-number';
import { Box } from '@mui/material';

interface AnimatedStatProps {
  value: number;
  label?: string;
  icon?: ReactNode;
  className?: string;
  color?: string;
  springOptions?: {
    bounce?: number;
    duration?: number;
  };
}

export function AnimatedStat({
  value,
  label,
  icon,
  className = '',
  color = '#737373',
  springOptions = {
    bounce: 0,
    duration: 2000,
  },
}: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
          }}
        >
          {icon}
        </Box>
      )}
      <AnimatedNumber
        className={`inline-flex items-center font-mono text-2xl font-light ${className}`}
        springOptions={springOptions}
        value={displayValue}
      />
    </Box>
  );
}
