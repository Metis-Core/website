import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import AccountSidebar from '@/components/account-sidebar';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getCurrentUserAndProfile();
  if (!profile) redirect('/login?next=/account');

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, mt: { xs: 6, md: 8 } }}>
      <AccountSidebar isAdmin={profile.role === 'admin'}>{children}</AccountSidebar>
    </Container>
  );
}
