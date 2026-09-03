import Link from 'next/link';
import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/supabase/queries';
import StatusChip from '@/components/status-chip';
import CustomButton from '@/components/button';
import type { Consultation } from '@/lib/supabase/types';

export const metadata = { title: 'My consultations · Metis Analytica' };

export default async function AccountConsultationsPage() {
  const { userId } = await requireUser();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('consultations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const items = (data ?? []) as Consultation[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
            My consultations
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            Consultations you&apos;ve requested with our team.
          </Typography>
        </Box>
        <CustomButton href="/consultation" variant="contained">
          Book another
        </CustomButton>
      </Box>

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>
            No consultations yet. <Link href="/consultation" style={{ color: '#000', fontWeight: 600 }}>Book your first one</Link>.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((c) => (
            <Paper key={c.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5, flexWrap: 'wrap' }}>
                <StatusChip status={c.status} />
                {c.service_interest && (
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Interest: <strong>{c.service_interest}</strong>
                  </Typography>
                )}
                <Typography variant="caption" sx={{ color: '#999', ml: 'auto' }}>
                  {new Date(c.created_at).toLocaleDateString()}
                </Typography>
              </Box>
              {c.preferred_date && (
                <Typography variant="body2" sx={{ color: '#333', mb: 1 }}>
                  Preferred date: <strong>{new Date(c.preferred_date).toLocaleDateString()}</strong>
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {c.message}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
