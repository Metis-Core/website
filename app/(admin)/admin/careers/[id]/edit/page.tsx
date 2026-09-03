import { notFound } from 'next/navigation';
import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import { updateCareerAction } from '@/app/actions/catalog';
import CareerForm from '../../_components/career-form';
import type { CareerPosition } from '@/lib/supabase/types';

export const metadata = { title: 'Edit position · Admin' };

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: career } = await supabase.from('career_positions').select('*').eq('id', id).maybeSingle<CareerPosition>();
  if (!career) notFound();

  const boundAction = updateCareerAction.bind(null, id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>Edit position</Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>{career.title}</Typography>
      </Box>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <CareerForm career={career} action={boundAction} submitLabel="Save changes" />
      </Paper>
    </Box>
  );
}
