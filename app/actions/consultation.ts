'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { sendEmail, adminNotificationEmail } from '@/lib/email/mailer';
import { consultationAdminEmail, consultationConfirmationEmail } from '@/lib/email/templates';

export type FormState = { error?: string; success?: string } | null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function bookConsultationAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const organization = String(formData.get('organization') ?? '').trim() || null;
  const sector = String(formData.get('sector') ?? '').trim() || null;
  const serviceInterest = String(formData.get('service_interest') ?? '').trim() || null;
  const message = String(formData.get('message') ?? '').trim();
  const preferredDateRaw = String(formData.get('preferred_date') ?? '').trim();
  const preferredDate = preferredDateRaw || null;

  if (name.length < 2) return { error: 'Please enter your name.' };
  if (!emailRegex.test(email)) return { error: 'Enter a valid email.' };
  if (!phone) return { error: 'Please enter a phone number.' };
  if (message.length < 10) return { error: 'Tell us a bit more about what you need (min 10 characters).' };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from('consultations').insert({
    user_id: user?.id ?? null,
    name,
    email,
    phone,
    organization,
    sector,
    service_interest: serviceInterest,
    message,
    preferred_date: preferredDate,
  });
  if (error) return { error: error.message };

  const payload = { name, email, phone, organization, sector, service_interest: serviceInterest, preferred_date: preferredDate, message };
  const adminTo = adminNotificationEmail();
  await Promise.allSettled([
    adminTo ? sendEmail({ to: adminTo, replyTo: email, ...consultationAdminEmail(payload) }) : Promise.resolve(),
    sendEmail({ to: email, ...consultationConfirmationEmail(payload) }),
  ]);

  revalidatePath('/account/consultations');
  revalidatePath('/admin/consultations');
  return { success: 'Thanks — we\'ll be in touch within 24 hours to schedule.' };
}
