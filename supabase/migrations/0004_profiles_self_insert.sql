-- =============================================================================
-- Allow authenticated users to insert their own profile row.
-- The `handle_new_user()` trigger already runs with SECURITY DEFINER, so it
-- normally covers profile creation. This policy is defense-in-depth so that
-- `getCurrentUserAndProfile()`'s self-heal upsert can succeed if the trigger
-- ever failed or a user existed before the trigger was installed.
-- =============================================================================

drop policy if exists "profiles: self insert" on public.profiles;
create policy "profiles: self insert"
  on public.profiles for insert
  with check (auth.uid() = id);
