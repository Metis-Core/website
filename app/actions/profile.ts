'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type FormState = { error?: string; success?: string } | null;

export async function updateProfileAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated.' };

  const fullName = String(formData.get('full_name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const organization = String(formData.get('organization') ?? '').trim() || null;
  const bio = String(formData.get('bio') ?? '').trim() || null;

  if (fullName.length < 2) return { error: 'Please enter your full name.' };

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: fullName, phone, organization, bio })
    .eq('id', user.id);
  if (error) return { error: error.message };

  revalidatePath('/account');
  revalidatePath('/account/settings');
  return { success: 'Profile updated.' };
}

export async function updatePasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' };
  if (password !== confirm) return { error: 'Passwords do not match.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  return { success: 'Password updated.' };
}
