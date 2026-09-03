'use client';

import { useTransition } from 'react';
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';

export default function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (next: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  const handle = (e: SelectChangeEvent<string>) => {
    const next = e.target.value;
    if (next === value) return;
    startTransition(() => {
      void onChange(next);
    });
  };

  return (
    <Select
      value={value}
      onChange={handle}
      size="small"
      disabled={pending}
      sx={{ minWidth: 140, fontSize: '0.8rem', textTransform: 'capitalize' }}
    >
      {options.map((o) => (
        <MenuItem key={o} value={o} sx={{ textTransform: 'capitalize' }}>
          {o.replace(/_/g, ' ')}
        </MenuItem>
      ))}
    </Select>
  );
}
