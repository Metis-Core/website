import Link from 'next/link';
import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/supabase/queries';
import StatusChip from '@/components/status-chip';
import CustomButton from '@/components/button';
import type { JobApplication, CareerPosition } from '@/lib/supabase/types';

export const metadata = { title: 'My applications · Metis Analytica' };

type Row = JobApplication & { career_positions: Pick<CareerPosition, 'title' | 'slug'> | null };

export default async function AccountApplicationsPage() {
  const { userId } = await requireUser();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('job_applications')
    .select('*, career_positions(title, slug)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const items = (data ?? []) as Row[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
            My applications
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            Roles you&apos;ve applied for and their current status.
          </Typography>
        </Box>
        <CustomButton component={Link} href="/careers" variant="contained">
          Browse careers
        </CustomButton>
      </Box>

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>
            No applications yet. <Link href="/careers" style={{ color: '#000', fontWeight: 600 }}>See open roles</Link>.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((a) => (
            <Paper key={a.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                <StatusChip status={a.status} />
                <Typography variant="caption" sx={{ color: '#999', ml: 'auto' }}>
                  {new Date(a.created_at).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#000', mb: 0.5 }}>
                {a.career_positions?.title ?? 'Position removed'}
              </Typography>
              {a.career_positions && (
                <Link href={`/careers/${a.career_positions.slug}`} style={{ color: '#666', fontSize: '0.85rem' }}>
                  View role →
                </Link>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
