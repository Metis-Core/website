'use client';

import DeleteRowButton from '@/components/delete-row-button';
import { deleteUserAction } from '@/app/actions/admin';

export default function DeleteUserButton({ id, disabled }: { id: string; disabled?: boolean }) {
  if (disabled) return null;
  return (
    <DeleteRowButton
      onDelete={async () => deleteUserAction(id)}
      confirmMessage="Delete this user's profile? Their auth account will remain — this only removes the app profile row."
    />
  );
}
