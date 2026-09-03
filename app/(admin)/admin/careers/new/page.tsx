import { Box, Paper, Typography } from '@mui/material';
import { requireAdmin } from '@/lib/supabase/queries';
import { createCareerAction } from '@/app/actions/catalog';
import CareerForm from '../_components/career-form';

export const metadata = { title: 'New position · Admin' };

export default async function NewCareerPage() {
  await requireAdmin();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>New position</Typography>
      </Box>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <CareerForm action={createCareerAction} submitLabel="Create position" />
      </Paper>
    </Box>
  );
}
