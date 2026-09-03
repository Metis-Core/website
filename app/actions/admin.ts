'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { ApplicationStatus, ConsultationStatus, FeedbackStatus, MessageStatus, UserRole } from '@/lib/supabase/types';

export type FormState = { error?: string; success?: string } | null;

export async function updateFeedbackStatusAction(id: string, status: FeedbackStatus) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('feedback').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/feedback');
}

export async function updateConsultationStatusAction(id: string, status: ConsultationStatus) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('consultations').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/consultations');
}

export async function updateApplicationStatusAction(id: string, status: ApplicationStatus) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('job_applications').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/applications');
}

export async function updateMessageStatusAction(id: string, status: MessageStatus) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
}

export async function updateUserRoleAction(userId: string, role: UserRole) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/users');
}

export async function toggleServiceActiveAction(id: string, isActive: boolean) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('services').update({ is_active: isActive }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
}

export async function toggleProductActiveAction(id: string, isActive: boolean) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('products').update({ is_active: isActive }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
  revalidatePath('/products');
}

export async function toggleCareerActiveAction(id: string, isActive: boolean) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('career_positions').update({ is_active: isActive }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/careers');
  revalidatePath('/careers');
}
