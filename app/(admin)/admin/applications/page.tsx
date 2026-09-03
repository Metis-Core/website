import Link from 'next/link';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DownloadOutlined, VisibilityOutlined } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { JobApplication, CareerPosition } from '@/lib/supabase/types';
import ApplicationStatusSelect from './_components/application-status-select';

export const metadata = { title: 'Applications · Admin' };

type Row = JobApplication & { career_positions: Pick<CareerPosition, 'title' | 'slug'> | null };

export default async function AdminApplicationsPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('job_applications')
    .select('*, career_positions(title, slug)')
    .order('created_at', { ascending: false });
  const items = (data ?? []) as Row[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          Applications
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          {items.length} total application{items.length === 1 ? '' : 's'}.
        </Typography>
      </Box>

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>No applications yet.</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((a) => (
            <Paper key={a.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 240 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {a.full_name} <Typography component="span" variant="caption" sx={{ color: '#666' }}>· {a.email}</Typography>
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    {new Date(a.created_at).toLocaleString()} · Applied for{' '}
                    {a.career_positions ? (
                      <Link href={`/careers/${a.career_positions.slug}`} style={{ color: '#000', fontWeight: 600 }}>
                        {a.career_positions.title}
                      </Link>
                    ) : (
                      <em>removed role</em>
                    )}
                  </Typography>
                </Box>
                <ApplicationStatusSelect id={a.id} value={a.status} />
              </Box>

              {a.phone && (
                <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
                  Phone: {a.phone}
                </Typography>
              )}
              {a.resume_url && (
                <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 700, mr: 0.5 }}>RESUME</Typography>
                  <Button
                    component="a"
                    href={a.resume_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityOutlined />}
                    sx={{ textTransform: 'none' }}
                  >
                    View
                  </Button>
                  <Button
                    component="a"
                    href={a.resume_url}
                    download
                    variant="contained"
                    size="small"
                    startIcon={<DownloadOutlined />}
                    sx={{ textTransform: 'none', bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
                  >
                    Download
                  </Button>
                </Box>
              )}
              {a.cover_letter_url && (
                <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 700, mr: 0.5 }}>COVER LETTER</Typography>
                  <Button
                    component="a"
                    href={a.cover_letter_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityOutlined />}
                    sx={{ textTransform: 'none' }}
                  >
                    View
                  </Button>
                  <Button
                    component="a"
                    href={a.cover_letter_url}
                    download
                    variant="contained"
                    size="small"
                    startIcon={<DownloadOutlined />}
                    sx={{ textTransform: 'none', bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
                  >
                    Download
                  </Button>
                </Box>
              )}
              {a.cover_letter && (
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 700, letterSpacing: '0.04em' }}>
                    COVER LETTER
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap', mt: 0.5 }}>
                    {a.cover_letter}
                  </Typography>
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
