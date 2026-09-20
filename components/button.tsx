'use client';

import { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { brand } from '@/lib/brand';

interface CustomButtonProps extends Omit<MuiButtonProps, 'href'> {
  children: ReactNode;
  href?: string;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  borderRadius: 8,
  padding: '10px 24px',
  minHeight: 44,
  transition: 'background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 8px 16px ${brand.accentBlue}4d`,
    },
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}14`,
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const CustomButton: FC<CustomButtonProps> = ({
  children,
  variant = 'contained',
  href,
  ...props
}) => {
  if (href) {
    return (
      <StyledButton variant={variant} component={NextLink} href={href} {...props}>
        {children}
      </StyledButton>
    );
  }
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
