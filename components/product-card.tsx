'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';
import { PlusIcon } from 'lucide-react';
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

interface ProductCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  icon,
  title,
  subtitle,
  description,
  features,
  color,
  link,
}) => {
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
        className='flex max-w-full flex-col overflow-hidden border bg-white dark:border-zinc-50/10 dark:bg-zinc-900 transition-all duration-300 hover:shadow-lg h-full cursor-pointer p-6'
      >
          <div className='flex justify-center mb-4'>
            <Box sx={{ display: 'flex', justifyContent: 'center', color, mb: 2 }}>
              {icon}
            </Box>
          </div>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#000', mb: 0.5, textAlign: 'center' }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: color, fontWeight: 600, textAlign: 'center', mb: 2, display: 'block' }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#666', mb: 3, textAlign: 'center', lineHeight: 1.6, minHeight: '60px' }}
          >
            {description}
          </Typography>

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
          <div className='h-32 w-full' style={{ backgroundColor: `${color}15` }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: color,
              }}
            >
              {icon}
            </Box>
          </div>
          <div className='p-6'>
            <MorphingDialogTitle className='text-2xl font-bold text-black mb-1'>
              {title}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='font-semibold mb-4' style={{ color: color }}>
              {subtitle}
            </MorphingDialogSubtitle>
            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: '#666', mb: 3, lineHeight: 1.8 }}
              >
                {description}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: '#000', mb: 2 }}
              >
                Key Features:
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

              <Link href={link} style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  variant="contained"
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
                  Explore {title}
                </Button>
              </Link>
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className='absolute top-4 right-4' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export default ProductCard;
