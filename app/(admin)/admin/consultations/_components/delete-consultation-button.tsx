'use client';

import DeleteRowButton from '@/components/delete-row-button';
import { deleteConsultationAction } from '@/app/actions/admin';

export default function DeleteConsultationButton({ id }: { id: string }) {
  return (
    <DeleteRowButton
      onDelete={async () => deleteConsultationAction(id)}
      confirmMessage="Delete this consultation request? This cannot be undone."
    />
  );
}
