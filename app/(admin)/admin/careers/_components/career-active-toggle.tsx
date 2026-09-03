'use client';

import { toggleCareerActiveAction } from '@/app/actions/admin';
import ActiveToggle from '@/components/active-toggle';

export default function CareerActiveToggle({ id, active }: { id: string; active: boolean }) {
  return <ActiveToggle active={active} onToggle={async (next) => toggleCareerActiveAction(id, next)} />;
}
