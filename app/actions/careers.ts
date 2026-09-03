'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { sendEmail, adminNotificationEmail } from '@/lib/email/mailer';
import { applicationAdminEmail, applicationConfirmationEmail } from '@/lib/email/templates';

export type FormState = { error?: string; success?: string } | null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function applyToPositionAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const positionId = String(formData.get('position_id') ?? '').trim();
  const fullName = String(formData.get('full_name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const resumeUrl = String(formData.get('resume_url') ?? '').trim() || null;
  const coverLetter = String(formData.get('cover_letter') ?? '').trim() || null;
  const coverLetterUrl = String(formData.get('cover_letter_url') ?? '').trim() || null;

  if (!positionId) return { error: 'Missing position reference.' };
  if (fullName.length < 2) return { error: 'Please enter your full name.' };
  if (!emailRegex.test(email)) return { error: 'Enter a valid email.' };
  if (!phone) return { error: 'Please enter a phone number.' };
  if (resumeUrl && !/^https?:\/\//i.test(resumeUrl)) {
    return { error: 'Resume URL must start with http:// or https://.' };
  }
  if (coverLetterUrl && !/^https?:\/\//i.test(coverLetterUrl)) {
    return { error: 'Cover letter URL must start with http:// or https://.' };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: position } = await supabase
    .from('career_positions')
    .select('title, slug')
    .eq('id', positionId)
    .maybeSingle();

  const { error } = await supabase.from('job_applications').insert({
    position_id: positionId,
    user_id: user?.id ?? null,
    full_name: fullName,
    email,
    phone,
    resume_url: resumeUrl,
    cover_letter: coverLetter,
    cover_letter_url: coverLetterUrl,
  });
  if (error) return { error: error.message };

  const payload = {
    full_name: fullName,
    email,
    phone,
    resume_url: resumeUrl,
    cover_letter: coverLetter,
    cover_letter_url: coverLetterUrl,
    position_title: position?.title ?? 'a role at Metis',
    position_slug: position?.slug ?? '',
  };
  const adminTo = adminNotificationEmail();
  await Promise.allSettled([
    adminTo ? sendEmail({ to: adminTo, replyTo: email, ...applicationAdminEmail(payload) }) : Promise.resolve(),
    sendEmail({ to: email, ...applicationConfirmationEmail(payload) }),
  ]);

  revalidatePath('/account/applications');
  revalidatePath('/admin/applications');
  return { success: 'Application received — we\'ll review and reach out.' };
}
