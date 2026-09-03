-- Add uploaded cover-letter URL alongside the existing free-text `cover_letter`.
alter table public.job_applications
  add column if not exists cover_letter_url text;

-- Force PostgREST (Supabase's REST layer) to reload its schema cache so it
-- sees the new column immediately without needing a project restart.
notify pgrst, 'reload schema';
