import { Box, Chip, Paper, Tooltip, Typography } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { Service } from '@/lib/supabase/types';
import CustomButton from '@/components/button';
import SearchBar from '@/components/search-bar';
import { LinkIconButton } from '@/components/link-wrappers';
import { matchesQuery } from '@/lib/search';
import ServiceActiveToggle from './_components/service-active-toggle';
import DeleteServiceButton from './_components/delete-service-button';

export const metadata = { title: 'Services · Admin' };

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const { q = '' } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
  const all = (data ?? []) as Service[];
  const items = q ? all.filter((s) => matchesQuery([s.title, s.slug, s.subtitle, s.layer, ...s.capabilities], q)) : all;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
            Services
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            {items.length} of {all.length} service{all.length === 1 ? '' : 's'}{q ? ` matching “${q}”` : ''}. Toggle to show / hide on the public site.
          </Typography>
        </Box>
        <CustomButton href="/admin/services/new" variant="contained">
          New service
        </CustomButton>
      </Box>

      <SearchBar placeholder="Search services by title, slug, capability…" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        {items.map((s) => (
          <Paper
            key={s.id}
            elevation={0}
            sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee', borderLeft: `4px solid ${s.color}` }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ minWidth: 0 }}>
                {s.layer && (
                  <Chip label={s.layer} size="small" sx={{ bgcolor: s.color, color: '#fff', fontWeight: 700, mb: 1 }} />
                )}
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>
                  {s.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>slug: {s.slug}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title="Edit">
                  <LinkIconButton href={`/admin/services/${s.id}/edit`} size="small">
                    <EditOutlined fontSize="small" />
                  </LinkIconButton>
                </Tooltip>
                <DeleteServiceButton id={s.id} />
                <ServiceActiveToggle id={s.id} active={s.is_active} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#333', mt: 1.5, lineHeight: 1.6 }}>
              {s.description}
            </Typography>
            {s.capabilities.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
                {s.capabilities.slice(0, 6).map((c) => (
                  <Chip key={c} label={c} size="small" variant="outlined" />
                ))}
                {s.capabilities.length > 6 && (
                  <Chip label={`+${s.capabilities.length - 6} more`} size="small" />
                )}
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
