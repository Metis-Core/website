import Link from 'next/link';
import { Box, Chip, Paper, Typography } from '@mui/material';
import {
  ArrowForwardOutlined,
  CalendarMonthOutlined,
  DescriptionOutlined,
  EditNoteOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/supabase/queries';
import StatusChip from '@/components/status-chip';
import CustomButton from '@/components/button';
import SearchBar from '@/components/search-bar';
import { matchesQuery } from '@/lib/search';
import type { JobApplication, CareerPosition, ApplicationStatus } from '@/lib/supabase/types';

export const metadata = { title: 'My applications · Metis Analytica' };

type Row = JobApplication & {
  career_positions:
    | Pick<CareerPosition, 'title' | 'slug' | 'department' | 'location' | 'type' | 'is_active'>
    | null;
};

const TYPE_LABEL: Record<CareerPosition['type'], string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
};

const STATUS_DESCRIPTION: Record<ApplicationStatus, string> = {
  new: 'We\'ve received your application and it\'s in the queue.',
  reviewing: 'Our team is reviewing your background and materials.',
  interview: 'You\'ve been shortlisted — expect an interview invite soon.',
  offered: 'We\'ve made you an offer. Check your email.',
  hired: '🎉 Welcome to Metis.',
  rejected: 'We won\'t be moving forward this time. Thank you for applying.',
};

const STATUS_LEGEND: Array<{ status: ApplicationStatus; label: string }> = [
  { status: 'new', label: 'New' },
  { status: 'reviewing', label: 'Reviewing' },
  { status: 'interview', label: 'Interview' },
  { status: 'offered', label: 'Offered' },
  { status: 'hired', label: 'Hired' },
  { status: 'rejected', label: 'Rejected' },
];

export default async function AccountApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { userId } = await requireUser();
  const { q = '' } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('job_applications')
    .select('*, career_positions(title, slug, department, location, type, is_active)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const all = (data ?? []) as Row[];
  const items = q
    ? all.filter((a) =>
        matchesQuery(
          [a.career_positions?.title, a.career_positions?.department, a.career_positions?.location, a.status],
          q,
        ),
      )
    : all;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
            My applications
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            {items.length} of {all.length} application{all.length === 1 ? '' : 's'}
            {q ? ` matching “${q}”` : ''}.
          </Typography>
        </Box>
        <CustomButton href="/careers" variant="contained">
          Browse careers
        </CustomButton>
      </Box>

      <SearchBar placeholder="Search by role, department, location, status…" />

      {all.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #eee', bgcolor: '#fafafa' }}>
          <Typography variant="caption" sx={{ color: '#666', fontWeight: 700, letterSpacing: '0.04em', display: 'block', mb: 1 }}>
            STATUS LEGEND
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {STATUS_LEGEND.map((s) => (
              <StatusChip key={s.status} status={s.status} />
            ))}
          </Box>
        </Paper>
      )}

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>
            {all.length === 0 ? (
              <>
                No applications yet.{' '}
                <Link href="/careers" style={{ color: '#000', fontWeight: 600 }}>
                  See open roles
                </Link>
                .
              </>
            ) : (
              <>No applications match “{q}”.</>
            )}
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((a) => {
            const roleGone = !a.career_positions;
            const roleClosed = a.career_positions && !a.career_positions.is_active;
            return (
              <Paper key={a.id} elevation={0} sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: '14px', border: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5, flexWrap: 'wrap' }}>
                  <StatusChip status={a.status} />
                  {roleClosed && (
                    <Chip label="Role closed" size="small" sx={{ bgcolor: '#eee', color: '#555', fontWeight: 600, fontSize: '0.7rem' }} />
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto', color: '#999' }}>
                    <CalendarMonthOutlined sx={{ fontSize: 14 }} />
                    <Typography variant="caption">
                      Applied {new Date(a.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000', mb: 0.5 }}>
                  {a.career_positions?.title ?? 'Position removed'}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, color: '#666', mb: 1.5 }}>
                  {a.career_positions?.department && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <WorkOutlineOutlined sx={{ fontSize: 16 }} />
                      <Typography variant="caption">{a.career_positions.department}</Typography>
                    </Box>
                  )}
                  {a.career_positions?.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnOutlined sx={{ fontSize: 16 }} />
                      <Typography variant="caption">{a.career_positions.location}</Typography>
                    </Box>
                  )}
                  {a.career_positions?.type && (
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
                      · {TYPE_LABEL[a.career_positions.type]}
                    </Typography>
                  )}
                </Box>

                <Typography variant="body2" sx={{ color: '#333', mb: 2, lineHeight: 1.5 }}>
                  {STATUS_DESCRIPTION[a.status]}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: a.career_positions ? 2 : 0 }}>
                  {a.resume_url && (
                    <Chip
                      icon={<DescriptionOutlined sx={{ fontSize: 16 }} />}
                      label="Resume submitted"
                      size="small"
                      component="a"
                      href={a.resume_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      clickable
                      sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }}
                    />
                  )}
                  {a.cover_letter_url && (
                    <Chip
                      icon={<DescriptionOutlined sx={{ fontSize: 16 }} />}
                      label="Cover letter file"
                      size="small"
                      component="a"
                      href={a.cover_letter_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      clickable
                      sx={{ bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 600 }}
                    />
                  )}
                  {a.cover_letter && (
                    <Chip
                      icon={<EditNoteOutlined sx={{ fontSize: 16 }} />}
                      label="Cover letter written"
                      size="small"
                      sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a', fontWeight: 600 }}
                    />
                  )}
                  {!a.resume_url && !a.cover_letter_url && !a.cover_letter && (
                    <Chip label="No attachments" size="small" variant="outlined" sx={{ color: '#999' }} />
                  )}
                </Box>

                {a.career_positions && !roleGone && (
                  <Link
                    href={`/careers/${a.career_positions.slug}`}
                    style={{ color: '#000', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    View role <ArrowForwardOutlined sx={{ fontSize: 14 }} />
                  </Link>
                )}
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
