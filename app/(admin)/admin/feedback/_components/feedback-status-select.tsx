'use client';

import { updateFeedbackStatusAction } from '@/app/actions/admin';
import type { FeedbackStatus } from '@/lib/supabase/types';
import StatusSelect from '@/components/status-select';

const OPTIONS: readonly FeedbackStatus[] = ['new', 'triaged', 'in_progress', 'closed'];

export default function FeedbackStatusSelect({ id, value }: { id: string; value: FeedbackStatus }) {
  return (
    <StatusSelect
      value={value}
      options={OPTIONS}
      onChange={async (next) => updateFeedbackStatusAction(id, next as FeedbackStatus)}
    />
  );
}
