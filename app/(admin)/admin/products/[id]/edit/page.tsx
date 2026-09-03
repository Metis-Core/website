import { notFound } from 'next/navigation';
import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import { updateProductAction } from '@/app/actions/catalog';
import ProductForm from '../../_components/product-form';
import type { Product } from '@/lib/supabase/types';

export const metadata = { title: 'Edit product · Admin' };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', id).maybeSingle<Product>();
  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>Edit product</Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>{product.title}</Typography>
      </Box>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <ProductForm product={product} action={boundAction} submitLabel="Save changes" />
      </Paper>
    </Box>
  );
}
