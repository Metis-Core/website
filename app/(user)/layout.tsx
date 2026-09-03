import { redirect } from 'next/navigation';
import { getCurrentUserAndProfile } from '@/lib/supabase/queries';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import AccountShell from '@/components/account-shell';

export default async function AccountGroupLayout({ children }: { children: React.ReactNode }) {
  const { userId, profile } = await getCurrentUserAndProfile();

  if (!userId) {
    redirect('/login?next=/account');
  }

  if (!profile) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/login?next=/account');
  }

  const user = {
    email: profile.email,
    fullName: profile.full_name,
    avatarUrl: profile.avatar_url,
    isAdmin: profile.role === 'admin',
  };

  return <AccountShell user={user}>{children}</AccountShell>;
}
