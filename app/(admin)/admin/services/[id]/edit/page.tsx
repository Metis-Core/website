import { notFound } from 'next/navigation';
import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import { updateServiceAction } from '@/app/actions/catalog';
import ServiceForm from '../../_components/service-form';
import type { Service } from '@/lib/supabase/types';

export const metadata = { title: 'Edit service · Admin' };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: service } = await supabase.from('services').select('*').eq('id', id).maybeSingle<Service>();
  if (!service) notFound();

  const boundAction = updateServiceAction.bind(null, id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>Edit service</Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>{service.title}</Typography>
      </Box>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <ServiceForm service={service} action={boundAction} submitLabel="Save changes" />
      </Paper>
    </Box>
  );
}
