'use client';

import { useTransition } from 'react';
import { Switch } from '@mui/material';

export default function ActiveToggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: (next: boolean) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Switch
      checked={active}
      disabled={pending}
      onChange={(_, next) => {
        startTransition(() => {
          void onToggle(next);
        });
      }}
    />
  );
}
