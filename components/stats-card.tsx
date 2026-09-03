'use client';

import { ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog';
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

const StatsCard: React.FC<StatsCardProps> = ({
  number,
  label,
  description,
  icon,
  title,
  subtitle,
  details,
  features,
  color = '#737373',
  cta,
}) => {
  const displayTitle = title || label;

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: '12px',
          borderColor: `${color}30`,
          backgroundColor: `${color}05`,
        }}
        className='flex max-w-full flex-col overflow-hidden border bg-white dark:border-zinc-50/10 dark:bg-zinc-900 transition-all duration-300 hover:shadow-lg h-full cursor-pointer p-8 text-center min-h-[220px]'
      >
        {number && (
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', fontSize: '2.5rem' }}>
            <AnimatedStat
              value={parseInt(number)}
              color={color}
            />
          </Box>
        )}
        {!number && icon && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: color,
              mb: 2,
              fontSize: '2.5rem',
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{ color: '#666', fontWeight: 600, fontSize: '0.95rem', mb: 1 }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{ color: color, fontWeight: 600, fontSize: '0.85rem' }}
          >
            {description}
          </Typography>
        )}
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: '24px',
            borderColor: `${color}30`,
            backgroundColor: '#ffffff',
          }}
          className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
        >
          {icon && (
            <div className='h-32 w-full' style={{ backgroundColor: `${color}15` }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  color: color,
                  fontSize: '3rem',
                }}
              >
                {icon}
              </Box>
            </div>
          )}
          {number && !icon && (
            <div className='h-32 w-full' style={{ backgroundColor: `${color}15` }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: '3rem',
                }}
              >
                <AnimatedStat
                  value={parseInt(number)}
                  color={color}
                  className='text-4xl'
                />
              </Box>
            </div>
          )}
          {number && icon && (
            <div className='h-32 w-full' style={{ backgroundColor: `${color}15` }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: '3rem',
                  gap: 2,
                }}
              >
                {icon}
                <AnimatedStat
                  value={parseInt(number)}
                  color={color}
                  className='text-4xl'
                />
              </Box>
            </div>
          )}

          <div className='p-6'>
            <MorphingDialogTitle className='text-2xl font-bold text-black mb-1'>
              {displayTitle}
            </MorphingDialogTitle>
            {(subtitle || description) && (
              <MorphingDialogSubtitle className='font-semibold mb-4' style={{ color: color }}>
                {subtitle || description}
              </MorphingDialogSubtitle>
            )}

            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              {details && (
                <div>
                  {typeof details === 'string' ? (
                    <Typography
                      variant="body2"
                      sx={{ color: '#666', mb: 3, lineHeight: 1.8 }}
                    >
                      {details}
                    </Typography>
                  ) : (
                    details
                  )}
                </div>
              )}

              {features && features.length > 0 && (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: '#000', mb: 2 }}
                  >
                    Details:
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {features.map((feature, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Box
                          sx={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {cta && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={cta.onClick}
                  sx={{
                    backgroundColor: color,
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: 'none',
                    py: 1.5,
                    mt: 2,
                    '&:hover': {
                      backgroundColor: color,
                      opacity: 0.9,
                    },
                  }}
                >
                  {cta.text}
                </Button>
              )}
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className='absolute top-4 right-4' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export default StatsCard;
