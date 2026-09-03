'use client';

import { useTransition } from 'react';
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { updateUserRoleAction } from '@/app/actions/admin';
import type { UserRole } from '@/lib/supabase/types';

export default function UserRoleSelect({
  userId,
  value,
  disabled,
}: {
  userId: string;
  value: UserRole;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const handle = (e: SelectChangeEvent<UserRole>) => {
    const next = e.target.value as UserRole;
    if (next === value) return;
    startTransition(() => {
      void updateUserRoleAction(userId, next);
    });
  };
  return (
    <Select
      value={value}
      onChange={handle}
      disabled={disabled || pending}
      size="small"
      sx={{ minWidth: 120, fontSize: '0.8rem', textTransform: 'capitalize' }}
    >
      <MenuItem value="user">User</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
    </Select>
  );
}
