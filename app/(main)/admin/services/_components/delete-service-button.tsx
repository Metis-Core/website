'use client';

import { deleteServiceAction } from '@/app/actions/catalog';
import DeleteRowButton from '@/components/delete-row-button';

export default function DeleteServiceButton({ id }: { id: string }) {
  return <DeleteRowButton onDelete={async () => deleteServiceAction(id)} confirmMessage="Delete this service? This cannot be undone." />;
}
