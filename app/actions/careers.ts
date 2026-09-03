'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type FormState = { error?: string; success?: string } | null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function applyToPositionAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const positionId = String(formData.get('position_id') ?? '').trim();
  const fullName = String(formData.get('full_name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const resumeUrl = String(formData.get('resume_url') ?? '').trim() || null;
  const coverLetter = String(formData.get('cover_letter') ?? '').trim() || null;

  if (!positionId) return { error: 'Missing position reference.' };
  if (fullName.length < 2) return { error: 'Please enter your full name.' };
  if (!emailRegex.test(email)) return { error: 'Enter a valid email.' };
  if (!phone) return { error: 'Please enter a phone number.' };
  if (resumeUrl && !/^https?:\/\//i.test(resumeUrl)) {
    return { error: 'Resume URL must start with http:// or https://.' };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from('job_applications').insert({
    position_id: positionId,
    user_id: user?.id ?? null,
    full_name: fullName,
    email,
    phone,
    resume_url: resumeUrl,
    cover_letter: coverLetter,
  });
  if (error) return { error: error.message };

  revalidatePath('/account/applications');
  revalidatePath('/admin/applications');
  return { success: 'Application received — we\'ll review and reach out.' };
}
