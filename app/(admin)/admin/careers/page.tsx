import Link from 'next/link';
import { Box, Chip, Paper, Tooltip, Typography } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { CareerPosition } from '@/lib/supabase/types';
import CustomButton from '@/components/button';
import SearchBar from '@/components/search-bar';
import { LinkIconButton } from '@/components/link-wrappers';
import { matchesQuery } from '@/lib/search';
import CareerActiveToggle from './_components/career-active-toggle';
import DeleteCareerButton from './_components/delete-career-button';

export const metadata = { title: 'Careers · Admin' };

const TYPE_LABEL: Record<CareerPosition['type'], string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
};

export default async function AdminCareersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const { q = '' } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('career_positions').select('*').order('created_at', { ascending: false });
  const all = (data ?? []) as CareerPosition[];
  const items = q ? all.filter((p) => matchesQuery([p.title, p.slug, p.department, p.location, TYPE_LABEL[p.type]], q)) : all;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>Careers</Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            {items.length} of {all.length} position{all.length === 1 ? '' : 's'}{q ? ` matching “${q}”` : ''}.
          </Typography>
        </Box>
        <CustomButton href="/admin/careers/new" variant="contained">
          New position
        </CustomButton>
      </Box>

      <SearchBar placeholder="Search positions by title, department, type…" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        {items.map((p) => (
          <Paper key={p.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ minWidth: 0 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  {p.department && <Chip label={p.department} size="small" sx={{ bgcolor: '#000', color: '#fff', fontWeight: 700 }} />}
                  <Chip label={TYPE_LABEL[p.type]} size="small" variant="outlined" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>{p.title}</Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {p.location} · <Link href={`/careers/${p.slug}`} style={{ color: '#000' }}>/{p.slug}</Link>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title="Edit">
                  <LinkIconButton href={`/admin/careers/${p.id}/edit`} size="small">
                    <EditOutlined fontSize="small" />
                  </LinkIconButton>
                </Tooltip>
                <DeleteCareerButton id={p.id} />
                <CareerActiveToggle id={p.id} active={p.is_active} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#333', mt: 1.5, lineHeight: 1.6 }}>{p.description}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
