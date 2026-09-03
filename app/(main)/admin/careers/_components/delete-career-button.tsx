'use client';

import { deleteCareerAction } from '@/app/actions/catalog';
import DeleteRowButton from '@/components/delete-row-button';

export default function DeleteCareerButton({ id }: { id: string }) {
  return <DeleteRowButton onDelete={async () => deleteCareerAction(id)} confirmMessage="Delete this position? This cannot be undone." />;
}
