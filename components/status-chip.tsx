import { Chip } from '@mui/material';

const COLOR_MAP: Record<string, { bg: string; fg: string }> = {
  new:         { bg: '#e3f2fd', fg: '#1565c0' },
  triaged:     { bg: '#fff3e0', fg: '#e65100' },
  contacted:   { bg: '#fff3e0', fg: '#e65100' },
  reviewing:   { bg: '#fff3e0', fg: '#e65100' },
  in_progress: { bg: '#e8f5e9', fg: '#2e7d32' },
  scheduled:   { bg: '#e8f5e9', fg: '#2e7d32' },
  interview:   { bg: '#e8f5e9', fg: '#2e7d32' },
  offered:     { bg: '#e0f2f1', fg: '#00695c' },
  completed:   { bg: '#e0f2f1', fg: '#00695c' },
  hired:       { bg: '#e0f2f1', fg: '#00695c' },
  closed:      { bg: '#eeeeee', fg: '#424242' },
  archived:    { bg: '#eeeeee', fg: '#424242' },
  read:        { bg: '#eeeeee', fg: '#424242' },
  replied:     { bg: '#e0f2f1', fg: '#00695c' },
  cancelled:   { bg: '#ffebee', fg: '#c62828' },
  rejected:    { bg: '#ffebee', fg: '#c62828' },
};

function label(status: string) {
  return status.replace(/_/g, ' ');
}

export default function StatusChip({ status }: { status: string }) {
  const c = COLOR_MAP[status] ?? { bg: '#eeeeee', fg: '#424242' };
  return (
    <Chip
      label={label(status)}
      size="small"
      sx={{
        bgcolor: c.bg,
        color: c.fg,
        fontWeight: 700,
        textTransform: 'capitalize',
        fontSize: '0.7rem',
      }}
    />
  );
}
