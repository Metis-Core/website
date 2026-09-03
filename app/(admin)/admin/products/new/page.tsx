import { Box, Paper, Typography } from '@mui/material';
import { requireAdmin } from '@/lib/supabase/queries';
import { createProductAction } from '@/app/actions/catalog';
import ProductForm from '../_components/product-form';

export const metadata = { title: 'New product · Admin' };

export default async function NewProductPage() {
  await requireAdmin();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>New product</Typography>
      </Box>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <ProductForm action={createProductAction} submitLabel="Create product" />
      </Paper>
    </Box>
  );
}
