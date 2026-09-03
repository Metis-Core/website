'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type FormState = { error?: string; success?: string } | null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessageAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const subject = String(formData.get('subject') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (name.length < 2) return { error: 'Please enter your name.' };
  if (!emailRegex.test(email)) return { error: 'Enter a valid email.' };
  if (!phone) return { error: 'Please enter a phone number.' };
  if (subject.length < 3) return { error: 'Please enter a subject.' };
  if (message.length < 10) return { error: 'Message must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from('contact_messages').insert({
    user_id: user?.id ?? null,
    name,
    email,
    phone,
    subject,
    message,
  });
  if (error) return { error: error.message };

  revalidatePath('/admin/messages');
  return { success: 'Message sent — we\'ll get back to you within 24 hours.' };
}
