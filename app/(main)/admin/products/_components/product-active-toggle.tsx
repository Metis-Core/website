'use client';

import { toggleProductActiveAction } from '@/app/actions/admin';
import ActiveToggle from '@/components/active-toggle';

export default function ProductActiveToggle({ id, active }: { id: string; active: boolean }) {
  return <ActiveToggle active={active} onToggle={async (next) => toggleProductActiveAction(id, next)} />;
}
