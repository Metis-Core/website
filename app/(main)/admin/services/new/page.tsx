import { Box, Paper, Typography } from '@mui/material';
import { requireAdmin } from '@/lib/supabase/queries';
import { createServiceAction } from '@/app/actions/catalog';
import ServiceForm from '../_components/service-form';

export const metadata = { title: 'New service · Admin' };

export default async function NewServicePage() {
  await requireAdmin();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>New service</Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          Create a new service that will appear on the home and services pages when active.
        </Typography>
      </Box>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <ServiceForm action={createServiceAction} submitLabel="Create service" />
      </Paper>
    </Box>
  );
}
