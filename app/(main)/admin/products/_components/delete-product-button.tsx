'use client';

import { deleteProductAction } from '@/app/actions/catalog';
import DeleteRowButton from '@/components/delete-row-button';

export default function DeleteProductButton({ id }: { id: string }) {
  return <DeleteRowButton onDelete={async () => deleteProductAction(id)} confirmMessage="Delete this product? This cannot be undone." />;
}
