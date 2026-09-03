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
    .single<Profile>();

  return { userId: user.id, profile: profile ?? null };
}

export async function requireUser(): Promise<{ userId: string; profile: Profile }> {
  const { userId, profile } = await getCurrentUserAndProfile();
  if (!userId || !profile) {
    throw new Error('Not authenticated');
  }
  return { userId, profile };
}

export async function requireAdmin(): Promise<{ userId: string; profile: Profile }> {
  const { userId, profile } = await requireUser();
  if (profile.role !== 'admin') {
    throw new Error('Forbidden');
  }
  return { userId, profile };
}
