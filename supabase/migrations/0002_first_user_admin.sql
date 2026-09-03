-- =============================================================================
-- Metis Analytica — 0002 · First registered user becomes admin
-- Idempotent. Re-runnable.
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  is_first boolean;
begin
  select not exists (select 1 from public.profiles) into is_first;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    case when is_first then 'admin'::user_role else 'user'::user_role end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;
