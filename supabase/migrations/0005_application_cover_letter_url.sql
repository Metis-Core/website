-- Add uploaded cover-letter URL alongside the existing free-text `cover_letter`.
alter table public.job_applications
  add column if not exists cover_letter_url text;
