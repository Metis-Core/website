import { Box, Paper, Rating, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { Feedback } from '@/lib/supabase/types';
import SearchBar from '@/components/search-bar';
import { matchesQuery } from '@/lib/search';
import FeedbackStatusSelect from './_components/feedback-status-select';
import DeleteFeedbackButton from './_components/delete-feedback-button';

export const metadata = { title: 'Feedback · Admin' };

export default async function AdminFeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const { q = '' } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('feedback').select('*').order('created_at', { ascending: false });
  const all = (data ?? []) as Feedback[];
  const items = q ? all.filter((f) => matchesQuery([f.name, f.email, f.message, f.category, f.status], q)) : all;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          Feedback
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          {items.length} of {all.length} submission{all.length === 1 ? '' : 's'}{q ? ` matching “${q}”` : ''}.
        </Typography>
      </Box>

      <SearchBar placeholder="Search feedback by name, email, message, status…" />

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>No feedback yet.</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((f) => (
            <Paper key={f.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 240 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {f.name} <Typography component="span" variant="caption" sx={{ color: '#666' }}>· {f.email}</Typography>
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    {new Date(f.created_at).toLocaleString()} · <span style={{ textTransform: 'capitalize' }}>{f.category}</span>
                  </Typography>
                </Box>
                <FeedbackStatusSelect id={f.id} value={f.status} />
                <DeleteFeedbackButton id={f.id} />
              </Box>
              {f.rating != null && <Rating value={f.rating} readOnly size="small" sx={{ mt: 1 }} />}
              <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap', mt: 1.5 }}>
                {f.message}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
