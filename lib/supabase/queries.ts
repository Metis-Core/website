import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './server';
import type { Profile } from './types';

export async function getCurrentUserAndProfile(): Promise<{
  userId: string | null;
  profile: Profile | null;
}> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { userId: null, profile: null };

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle<Profile>();

  if (profile) return { userId: user.id, profile };

  // Auth trigger missed this user — self-heal so we don't lock them out.
  const { data: created } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        email: user.email ?? '',
        full_name:
          (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          null,
      },
      { onConflict: 'id' },
    )
    .select('*')
    .single<Profile>();

  return { userId: user.id, profile: created ?? null };
}

export async function requireUser(): Promise<{ userId: string; profile: Profile }> {
  const { userId, profile } = await getCurrentUserAndProfile();
  if (!userId || !profile) {
    // proxy.ts already sets ?next=<pathname>; the layout also redirects.
    redirect('/login');
  }
  return { userId, profile };
}

export async function requireAdmin(): Promise<{ userId: string; profile: Profile }> {
  const { userId, profile } = await getCurrentUserAndProfile();
  if (!userId || !profile) {
    redirect('/login');
  }
  if (profile.role !== 'admin') {
    redirect('/account');
  }
  return { userId, profile };
}
