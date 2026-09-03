'use client';

import DeleteRowButton from '@/components/delete-row-button';
import { deleteFeedbackAction } from '@/app/actions/admin';

export default function DeleteFeedbackButton({ id }: { id: string }) {
  return (
    <DeleteRowButton
      onDelete={async () => deleteFeedbackAction(id)}
      confirmMessage="Delete this feedback entry? This cannot be undone."
    />
  );
}
