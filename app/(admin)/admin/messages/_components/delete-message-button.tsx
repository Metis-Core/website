'use client';

import DeleteRowButton from '@/components/delete-row-button';
import { deleteContactMessageAction } from '@/app/actions/admin';

export default function DeleteMessageButton({ id }: { id: string }) {
  return (
    <DeleteRowButton
      onDelete={async () => deleteContactMessageAction(id)}
      confirmMessage="Delete this contact message? This cannot be undone."
    />
  );
}
