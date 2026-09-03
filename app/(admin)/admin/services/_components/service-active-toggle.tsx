'use client';

import { toggleServiceActiveAction } from '@/app/actions/admin';
import ActiveToggle from '@/components/active-toggle';

export default function ServiceActiveToggle({ id, active }: { id: string; active: boolean }) {
  return <ActiveToggle active={active} onToggle={async (next) => toggleServiceActiveAction(id, next)} />;
}
