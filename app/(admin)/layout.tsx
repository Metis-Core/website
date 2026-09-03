import { redirect } from 'next/navigation';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin-shell';

export default async function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  const { userId, profile } = await getCurrentUserAndProfile();

  if (!userId) {
    redirect('/login?next=/admin');
  }

  if (!profile) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/login?next=/admin');
  }

  if (profile.role !== 'admin') redirect('/account');

  const user = {
    email: profile.email,
    fullName: profile.full_name,
    avatarUrl: profile.avatar_url,
  };

  return <AdminShell user={user}>{children}</AdminShell>;
}
