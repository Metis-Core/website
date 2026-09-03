'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type FormState = { error?: string; success?: string } | null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORIES = ['bug', 'feature', 'praise', 'question', 'other'] as const;

export async function submitFeedbackAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const categoryRaw = String(formData.get('category') ?? 'other');
  const category = (CATEGORIES as readonly string[]).includes(categoryRaw) ? categoryRaw : 'other';
  const ratingRaw = String(formData.get('rating') ?? '');
  const ratingNum = ratingRaw ? Number(ratingRaw) : null;
  const rating = ratingNum && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : null;
  const message = String(formData.get('message') ?? '').trim();

  if (name.length < 2) return { error: 'Please enter your name.' };
  if (!emailRegex.test(email)) return { error: 'Enter a valid email.' };
  if (message.length < 10) return { error: 'Feedback must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from('feedback').insert({
    user_id: user?.id ?? null,
    name,
    email,
    category,
    rating,
    message,
  });
  if (error) return { error: error.message };

  revalidatePath('/account/feedback');
  revalidatePath('/admin/feedback');
  return { success: 'Thanks — your feedback has been recorded.' };
}
