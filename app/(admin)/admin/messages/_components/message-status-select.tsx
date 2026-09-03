'use client';

import { updateMessageStatusAction } from '@/app/actions/admin';
import type { MessageStatus } from '@/lib/supabase/types';
import StatusSelect from '@/components/status-select';

const OPTIONS: readonly MessageStatus[] = ['new', 'read', 'replied', 'archived'];

export default function MessageStatusSelect({ id, value }: { id: string; value: MessageStatus }) {
  return (
    <StatusSelect
      value={value}
      options={OPTIONS}
      onChange={async (next) => updateMessageStatusAction(id, next as MessageStatus)}
    />
  );
}
