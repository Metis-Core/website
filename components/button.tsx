'use client';

import { FC, ReactNode } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomButtonProps extends MuiButtonProps {
  children: ReactNode;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  borderRadius: '8px',
  padding: '10px 24px',
  transition: 'all 0.3s ease',
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 16px rgba(25, 118, 210, 0.3)`,
    },
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}10`,
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const CustomButton: FC<CustomButtonProps> = ({
  children,
  variant = 'contained',
  ...props
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
