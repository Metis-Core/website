import Link from 'next/link';
import { Box, Paper, Rating, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/supabase/queries';
import StatusChip from '@/components/status-chip';
import CustomButton from '@/components/button';
import type { Feedback } from '@/lib/supabase/types';

export const metadata = { title: 'My feedback · Metis Analytica' };

export default async function AccountFeedbackPage() {
  const { userId } = await requireUser();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('feedback')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const items = (data ?? []) as Feedback[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
            My feedback
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            Everything you&apos;ve shared with us.
          </Typography>
        </Box>
        <CustomButton href="/feedback" variant="contained">
          New feedback
        </CustomButton>
      </Box>

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>
            No feedback yet. Share your first note on the <Link href="/feedback" style={{ color: '#000', fontWeight: 600 }}>feedback page</Link>.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((f) => (
            <Paper key={f.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                <StatusChip status={f.status} />
                <Typography variant="caption" sx={{ color: '#666', textTransform: 'capitalize' }}>
                  {f.category.replace(/_/g, ' ')}
                </Typography>
                <Typography variant="caption" sx={{ color: '#999', ml: 'auto' }}>
                  {new Date(f.created_at).toLocaleDateString()}
                </Typography>
              </Box>
              {f.rating != null && <Rating value={f.rating} readOnly size="small" sx={{ mb: 1 }} />}
              <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {f.message}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
