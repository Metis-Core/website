const costs = [
  {
    value: '12 hrs',
    unit: 'every week',
    detail: 'Knowledge workers spend a workday and a half chasing data instead of deciding.',
  },
  {
    value: '47%',
    unit: 'of procurements',
    detail: 'Manual approvals and bid evaluations delay nearly half of public-sector purchases.',
  },
  {
    value: '69%',
    unit: 'of priority reports',
    detail: 'In health-sector assessments, only this share landed on time — staff were stuck in data entry.',
  },
] as const;

const segments = [
  {
    name: 'NGOs',
    pain: 'Donor reporting done by hand. Completeness sits at 83% against a 95% target.',
  },
  {
    name: 'SMEs',
    pain: 'No structured books, slow credit and ops. Automation has shown a 32.71% efficiency lift.',
  },
  {
    name: 'Corporations',
    pain: 'Departmental silos and reconciliation by spreadsheet. Analytics adoption tracks with performance.',
  },
  {
    name: 'Government',
    pain: 'Fragmented ministry data. Procurement can be 60% of spend; automation cuts prices 5–10%.',
  },
] as const;

export default function ProblemEvidence() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {costs.map((item) => (
          <div key={item.value} className="min-w-0">
            <p className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tabular-nums leading-none">
              {item.value}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-blue)]">
              {item.unit}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {segments.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5"
          >
            <p className="text-sm font-bold text-[var(--foreground)]">{item.name}</p>
            <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">{item.pain}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
