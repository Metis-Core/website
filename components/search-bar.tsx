'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { CloseOutlined, SearchOutlined } from '@mui/icons-material';

export interface SearchBarProps {
  placeholder?: string;
  paramName?: string;
  /** Debounce delay in ms before pushing the URL. Default 250. */
  debounceMs?: number;
}

export default function SearchBar({
  placeholder = 'Search…',
  paramName = 'q',
  debounceMs = 250,
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const initial = searchParams.get(paramName) ?? '';
  const [value, setValue] = useState(initial);

  // Sync local state if the URL is changed elsewhere (e.g. Back button).
  useEffect(() => {
    setValue(searchParams.get(paramName) ?? '');
  }, [searchParams, paramName]);

  useEffect(() => {
    const current = searchParams.get(paramName) ?? '';
    if (value === current) return;

    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    }, debounceMs);
    return () => clearTimeout(t);
  }, [value, debounceMs, paramName, pathname, router, searchParams]);

  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined sx={{ color: '#888' }} fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear search"
                size="small"
                onClick={() => setValue('')}
                disabled={pending}
              >
                <CloseOutlined fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{
        maxWidth: { sm: 380 },
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          bgcolor: '#fff',
        },
      }}
    />
  );
}
