-- =============================================================================
-- Metis Analytica — 0003 · Add phone column to contact_messages
-- =============================================================================

alter table public.contact_messages
  add column if not exists phone text;
