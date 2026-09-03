import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { Consultation } from '@/lib/supabase/types';
import ConsultationStatusSelect from './_components/consultation-status-select';

export const metadata = { title: 'Consultations · Admin' };

export default async function AdminConsultationsPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('consultations').select('*').order('created_at', { ascending: false });
  const items = (data ?? []) as Consultation[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          Consultations
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          {items.length} total request{items.length === 1 ? '' : 's'}.
        </Typography>
      </Box>

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>No consultation requests yet.</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((c) => (
            <Paper key={c.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 240 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {c.name} <Typography component="span" variant="caption" sx={{ color: '#666' }}>· {c.email}</Typography>
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    {new Date(c.created_at).toLocaleString()}
                    {c.preferred_date && ` · Preferred: ${new Date(c.preferred_date).toLocaleDateString()}`}
                  </Typography>
                </Box>
                <ConsultationStatusSelect id={c.id} value={c.status} />
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1.5 }}>
                {c.organization && <MetaChip label="Org" value={c.organization} />}
                {c.sector && <MetaChip label="Sector" value={c.sector} />}
                {c.service_interest && <MetaChip label="Interest" value={c.service_interest} />}
                {c.phone && <MetaChip label="Phone" value={c.phone} />}
              </Box>

              <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap', mt: 1.5 }}>
                {c.message}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ px: 1, py: 0.25, borderRadius: '6px', bgcolor: '#f5f5f5' }}>
      <Typography variant="caption" sx={{ color: '#666' }}>{label}:</Typography>{' '}
      <Typography variant="caption" sx={{ color: '#000', fontWeight: 600 }}>{value}</Typography>
    </Box>
  );
}
