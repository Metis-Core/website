'use client';

import { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInputBase, { type Country } from 'react-phone-number-input';
import { Box, FormControl, FormHelperText, InputLabel } from '@mui/material';

export interface PhoneInputProps {
  name: string;
  label?: string;
  defaultValue?: string | null;
  required?: boolean;
  helperText?: string;
  defaultCountry?: Country;
}

export default function PhoneInput({
  name,
  label = 'Phone',
  defaultValue,
  required = false,
  helperText,
  defaultCountry = 'UG',
}: PhoneInputProps) {
  const [value, setValue] = useState<string | undefined>(defaultValue ?? undefined);
  const inputId = `phone-input-${name}`;

  return (
    <FormControl fullWidth variant="outlined" required={required}>
      <InputLabel
        shrink
        htmlFor={inputId}
        sx={{ position: 'relative', transform: 'none', mb: 0.75, color: '#666', fontSize: '0.85rem' }}
      >
        {label}
      </InputLabel>
      <input type="hidden" name={name} value={value ?? ''} />
      <Box
        sx={{
          border: '1px solid rgba(0,0,0,0.23)',
          borderRadius: '8px',
          px: 1.5,
          py: 1.25,
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          '&:hover': { borderColor: 'rgba(0,0,0,0.6)' },
          '&:focus-within': {
            borderColor: '#1976d2',
            boxShadow: '0 0 0 3px rgba(25,118,210,0.15)',
          },
          '.PhoneInput': { display: 'flex', alignItems: 'center', gap: 8 },
          '.PhoneInputCountry': { display: 'flex', alignItems: 'center' },
          '.PhoneInputCountrySelect': { fontSize: '0.95rem', color: '#000' },
          '.PhoneInputInput': {
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            background: 'transparent',
            color: '#000',
          },
        }}
      >
        <PhoneInputBase
          id={inputId}
          international
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry}
          value={value}
          onChange={setValue}
          required={required}
        />
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
