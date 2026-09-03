'use client';

import { updateApplicationStatusAction } from '@/app/actions/admin';
import type { ApplicationStatus } from '@/lib/supabase/types';
import StatusSelect from '@/components/status-select';

const OPTIONS: readonly ApplicationStatus[] = ['new', 'reviewing', 'interview', 'offered', 'rejected', 'hired'];

export default function ApplicationStatusSelect({ id, value }: { id: string; value: ApplicationStatus }) {
  return (
    <StatusSelect
      value={value}
      options={OPTIONS}
      onChange={async (next) => updateApplicationStatusAction(id, next as ApplicationStatus)}
    />
  );
}
