import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import AdminSidebar from '@/components/admin-sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getCurrentUserAndProfile();
  if (!profile) redirect('/login?next=/admin');
  if (profile.role !== 'admin') redirect('/account');

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, mt: { xs: 6, md: 8 } }}>
      <AdminSidebar>{children}</AdminSidebar>
    </Container>
  );
}
