'use client';

import DeleteRowButton from '@/components/delete-row-button';
import { deleteApplicationAction } from '@/app/actions/admin';

export default function DeleteApplicationButton({ id }: { id: string }) {
  return (
    <DeleteRowButton
      onDelete={async () => deleteApplicationAction(id)}
      confirmMessage="Delete this application? This cannot be undone."
    />
  );
}
