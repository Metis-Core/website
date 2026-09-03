import { Box, Chip, Paper, Tooltip, Typography } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { Product } from '@/lib/supabase/types';
import CustomButton from '@/components/button';
import { LinkIconButton } from '@/components/link-wrappers';
import ProductActiveToggle from './_components/product-active-toggle';
import DeleteProductButton from './_components/delete-product-button';

export const metadata = { title: 'Products · Admin' };

export default async function AdminProductsPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('products').select('*').order('sort_order', { ascending: true });
  const items = (data ?? []) as Product[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>Products</Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            {items.length} product{items.length === 1 ? '' : 's'}.
          </Typography>
        </Box>
        <CustomButton href="/admin/products/new" variant="contained">
          New product
        </CustomButton>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        {items.map((p) => (
          <Paper
            key={p.id}
            elevation={0}
            sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee', borderLeft: `4px solid ${p.color}` }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ minWidth: 0 }}>
                {p.subtitle && <Typography variant="overline" sx={{ color: '#666', fontWeight: 700 }}>{p.subtitle}</Typography>}
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>{p.title}</Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>slug: {p.slug}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title="Edit">
                  <LinkIconButton href={`/admin/products/${p.id}/edit`} size="small">
                    <EditOutlined fontSize="small" />
                  </LinkIconButton>
                </Tooltip>
                <DeleteProductButton id={p.id} />
                <ProductActiveToggle id={p.id} active={p.is_active} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#333', mt: 1.5, lineHeight: 1.6 }}>
              {p.description}
            </Typography>
            {p.features.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
                {p.features.slice(0, 6).map((f) => (
                  <Chip key={f} label={f} size="small" variant="outlined" />
                ))}
                {p.features.length > 6 && (
                  <Chip label={`+${p.features.length - 6} more`} size="small" />
                )}
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
