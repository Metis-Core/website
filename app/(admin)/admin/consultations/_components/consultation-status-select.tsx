'use client';

import { updateConsultationStatusAction } from '@/app/actions/admin';
import type { ConsultationStatus } from '@/lib/supabase/types';
import StatusSelect from '@/components/status-select';

const OPTIONS: readonly ConsultationStatus[] = ['new', 'contacted', 'scheduled', 'completed', 'cancelled'];

export default function ConsultationStatusSelect({ id, value }: { id: string; value: ConsultationStatus }) {
  return (
    <StatusSelect
      value={value}
      options={OPTIONS}
      onChange={async (next) => updateConsultationStatusAction(id, next as ConsultationStatus)}
    />
  );
}
