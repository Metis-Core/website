'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';

export type FormState = { error?: string; success?: string } | null;

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function parseList(input: string): string[] {
  return input
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// --------------------------------- Services ---------------------------------
export async function createServiceAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? title));
  const layer = String(formData.get('layer') ?? '').trim() || null;
  const subtitle = String(formData.get('subtitle') ?? '').trim() || null;
  const description = String(formData.get('description') ?? '').trim();
  const icon = String(formData.get('icon') ?? '').trim() || null;
  const color = String(formData.get('color') ?? '#737373').trim();
  const capabilities = parseList(String(formData.get('capabilities') ?? ''));
  const industries = parseList(String(formData.get('industries') ?? ''));
  const sortOrder = Number(formData.get('sort_order') ?? 0) || 0;
  const isActive = formData.get('is_active') === 'on' || formData.get('is_active') === 'true';

  if (title.length < 2) return { error: 'Title is required.' };
  if (!slug) return { error: 'Slug is required.' };
  if (description.length < 10) return { error: 'Description must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('services').insert({
    slug, layer, title, subtitle, description, icon, color,
    capabilities, industries, sort_order: sortOrder, is_active: isActive,
  });
  if (error) return { error: error.message };

  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services');
}

export async function updateServiceAction(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? ''));
  const layer = String(formData.get('layer') ?? '').trim() || null;
  const subtitle = String(formData.get('subtitle') ?? '').trim() || null;
  const description = String(formData.get('description') ?? '').trim();
  const icon = String(formData.get('icon') ?? '').trim() || null;
  const color = String(formData.get('color') ?? '#737373').trim();
  const capabilities = parseList(String(formData.get('capabilities') ?? ''));
  const industries = parseList(String(formData.get('industries') ?? ''));
  const sortOrder = Number(formData.get('sort_order') ?? 0) || 0;
  const isActive = formData.get('is_active') === 'on' || formData.get('is_active') === 'true';

  if (title.length < 2) return { error: 'Title is required.' };
  if (!slug) return { error: 'Slug is required.' };
  if (description.length < 10) return { error: 'Description must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('services').update({
    slug, layer, title, subtitle, description, icon, color,
    capabilities, industries, sort_order: sortOrder, is_active: isActive,
  }).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services');
}

export async function deleteServiceAction(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
}

// --------------------------------- Products ---------------------------------
export async function createProductAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? title));
  const subtitle = String(formData.get('subtitle') ?? '').trim() || null;
  const description = String(formData.get('description') ?? '').trim();
  const icon = String(formData.get('icon') ?? '').trim() || null;
  const color = String(formData.get('color') ?? '#737373').trim();
  const features = parseList(String(formData.get('features') ?? ''));
  const link = String(formData.get('link') ?? '').trim() || null;
  const sortOrder = Number(formData.get('sort_order') ?? 0) || 0;
  const isActive = formData.get('is_active') === 'on' || formData.get('is_active') === 'true';

  if (title.length < 2) return { error: 'Title is required.' };
  if (!slug) return { error: 'Slug is required.' };
  if (description.length < 10) return { error: 'Description must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('products').insert({
    slug, title, subtitle, description, icon, color, features, link,
    sort_order: sortOrder, is_active: isActive,
  });
  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  revalidatePath('/products');
  redirect('/admin/products');
}

export async function updateProductAction(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? ''));
  const subtitle = String(formData.get('subtitle') ?? '').trim() || null;
  const description = String(formData.get('description') ?? '').trim();
  const icon = String(formData.get('icon') ?? '').trim() || null;
  const color = String(formData.get('color') ?? '#737373').trim();
  const features = parseList(String(formData.get('features') ?? ''));
  const link = String(formData.get('link') ?? '').trim() || null;
  const sortOrder = Number(formData.get('sort_order') ?? 0) || 0;
  const isActive = formData.get('is_active') === 'on' || formData.get('is_active') === 'true';

  if (title.length < 2) return { error: 'Title is required.' };
  if (!slug) return { error: 'Slug is required.' };
  if (description.length < 10) return { error: 'Description must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('products').update({
    slug, title, subtitle, description, icon, color, features, link,
    sort_order: sortOrder, is_active: isActive,
  }).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  revalidatePath('/products');
  redirect('/admin/products');
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
  revalidatePath('/products');
}

// ---------------------------- Career positions ------------------------------
export async function createCareerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? title));
  const department = String(formData.get('department') ?? '').trim() || null;
  const location = String(formData.get('location') ?? '').trim() || 'Kampala, Uganda';
  const type = String(formData.get('type') ?? 'full_time');
  const description = String(formData.get('description') ?? '').trim();
  const responsibilities = parseList(String(formData.get('responsibilities') ?? ''));
  const requirements = parseList(String(formData.get('requirements') ?? ''));
  const isActive = formData.get('is_active') === 'on' || formData.get('is_active') === 'true';

  const validTypes = ['full_time', 'part_time', 'contract', 'internship'];
  if (!validTypes.includes(type)) return { error: 'Invalid employment type.' };

  if (title.length < 2) return { error: 'Title is required.' };
  if (!slug) return { error: 'Slug is required.' };
  if (description.length < 10) return { error: 'Description must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('career_positions').insert({
    slug, title, department, location, type,
    description, responsibilities, requirements, is_active: isActive,
  });
  if (error) return { error: error.message };

  revalidatePath('/admin/careers');
  revalidatePath('/careers');
  redirect('/admin/careers');
}

export async function updateCareerAction(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? ''));
  const department = String(formData.get('department') ?? '').trim() || null;
  const location = String(formData.get('location') ?? '').trim() || 'Kampala, Uganda';
  const type = String(formData.get('type') ?? 'full_time');
  const description = String(formData.get('description') ?? '').trim();
  const responsibilities = parseList(String(formData.get('responsibilities') ?? ''));
  const requirements = parseList(String(formData.get('requirements') ?? ''));
  const isActive = formData.get('is_active') === 'on' || formData.get('is_active') === 'true';

  const validTypes = ['full_time', 'part_time', 'contract', 'internship'];
  if (!validTypes.includes(type)) return { error: 'Invalid employment type.' };
  if (title.length < 2) return { error: 'Title is required.' };
  if (!slug) return { error: 'Slug is required.' };
  if (description.length < 10) return { error: 'Description must be at least 10 characters.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('career_positions').update({
    slug, title, department, location, type,
    description, responsibilities, requirements, is_active: isActive,
  }).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/careers');
  revalidatePath('/careers');
  redirect('/admin/careers');
}

export async function deleteCareerAction(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('career_positions').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/careers');
  revalidatePath('/careers');
}
