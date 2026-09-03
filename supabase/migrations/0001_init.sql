-- =============================================================================
-- Metis Analytica — Initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) once.
-- =============================================================================

-- ------------------------------- Extensions ---------------------------------
create extension if not exists "pgcrypto";

-- --------------------------------- Enums ------------------------------------
do $$ begin
  create type user_role as enum ('admin', 'user');
exception when duplicate_object then null; end $$;

do $$ begin
  create type feedback_category as enum ('bug', 'feature', 'praise', 'question', 'other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type feedback_status as enum ('new', 'triaged', 'in_progress', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type consultation_status as enum ('new', 'contacted', 'scheduled', 'completed', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type application_status as enum ('new', 'reviewing', 'interview', 'offered', 'rejected', 'hired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type message_status as enum ('new', 'read', 'replied', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type employment_type as enum ('full_time', 'part_time', 'contract', 'internship');
exception when duplicate_object then null; end $$;

-- ------------------------------ Helper: updated_at --------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------- profiles -----------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  full_name    text,
  avatar_url   text,
  role         user_role not null default 'user',
  phone        text,
  organization text,
  bio          text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper predicate reused by RLS policies.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- --------------------------------- services ---------------------------------
create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  layer        text,
  title        text not null,
  subtitle     text,
  description  text not null,
  icon         text,
  color        text not null default '#737373',
  capabilities text[] not null default '{}',
  industries   text[] not null default '{}',
  sort_order   int not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- --------------------------------- products ---------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  subtitle    text,
  description text not null,
  icon        text,
  color       text not null default '#737373',
  features    text[] not null default '{}',
  link        text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- --------------------------------- feedback ---------------------------------
create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  name       text not null,
  email      text not null,
  category   feedback_category not null default 'other',
  rating     int check (rating between 1 and 5),
  message    text not null,
  status     feedback_status not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists feedback_user_idx on public.feedback(user_id);
create index if not exists feedback_status_idx on public.feedback(status);

-- ------------------------------ consultations -------------------------------
create table if not exists public.consultations (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete set null,
  name             text not null,
  email            text not null,
  phone            text,
  organization     text,
  sector           text,
  service_interest text,
  message          text not null,
  preferred_date   date,
  status           consultation_status not null default 'new',
  created_at       timestamptz not null default now()
);

create index if not exists consultations_user_idx on public.consultations(user_id);
create index if not exists consultations_status_idx on public.consultations(status);

-- ---------------------------- career_positions ------------------------------
create table if not exists public.career_positions (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  department       text,
  location         text not null default 'Kampala, Uganda',
  type             employment_type not null default 'full_time',
  description      text not null,
  responsibilities text[] not null default '{}',
  requirements     text[] not null default '{}',
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

drop trigger if exists career_positions_set_updated_at on public.career_positions;
create trigger career_positions_set_updated_at
  before update on public.career_positions
  for each row execute function public.set_updated_at();

-- ---------------------------- job_applications ------------------------------
create table if not exists public.job_applications (
  id           uuid primary key default gen_random_uuid(),
  position_id  uuid not null references public.career_positions(id) on delete cascade,
  user_id      uuid references auth.users(id) on delete set null,
  full_name    text not null,
  email        text not null,
  phone        text,
  resume_url   text,
  cover_letter text,
  status       application_status not null default 'new',
  created_at   timestamptz not null default now()
);

create index if not exists job_applications_user_idx on public.job_applications(user_id);
create index if not exists job_applications_position_idx on public.job_applications(position_id);
create index if not exists job_applications_status_idx on public.job_applications(status);

-- ---------------------------- contact_messages ------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  status     message_status not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_user_idx on public.contact_messages(user_id);
create index if not exists contact_messages_status_idx on public.contact_messages(status);

-- ============================================================================
-- Row-Level Security
-- ============================================================================
alter table public.profiles          enable row level security;
alter table public.services          enable row level security;
alter table public.products          enable row level security;
alter table public.feedback          enable row level security;
alter table public.consultations     enable row level security;
alter table public.career_positions  enable row level security;
alter table public.job_applications  enable row level security;
alter table public.contact_messages  enable row level security;

-- Profiles: user reads/writes their own row; admins read/write all; role changes are admin-only.
drop policy if exists "profiles: self select" on public.profiles;
create policy "profiles: self select"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles: self update" on public.profiles;
create policy "profiles: self update"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (
    (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()))
    or public.is_admin()
  );

drop policy if exists "profiles: admin delete" on public.profiles;
create policy "profiles: admin delete"
  on public.profiles for delete
  using (public.is_admin());

-- Services: public read active; admin full write.
drop policy if exists "services: public read active" on public.services;
create policy "services: public read active"
  on public.services for select
  using (is_active or public.is_admin());

drop policy if exists "services: admin write" on public.services;
create policy "services: admin write"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());

-- Products: public read active; admin full write.
drop policy if exists "products: public read active" on public.products;
create policy "products: public read active"
  on public.products for select
  using (is_active or public.is_admin());

drop policy if exists "products: admin write" on public.products;
create policy "products: admin write"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- Feedback: anyone (incl. anon) can insert; users see their own; admin sees all.
drop policy if exists "feedback: anyone insert" on public.feedback;
create policy "feedback: anyone insert"
  on public.feedback for insert
  with check (true);

drop policy if exists "feedback: self or admin select" on public.feedback;
create policy "feedback: self or admin select"
  on public.feedback for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "feedback: admin update" on public.feedback;
create policy "feedback: admin update"
  on public.feedback for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "feedback: admin delete" on public.feedback;
create policy "feedback: admin delete"
  on public.feedback for delete
  using (public.is_admin());

-- Consultations: anyone can request; user sees own; admin sees all.
drop policy if exists "consultations: anyone insert" on public.consultations;
create policy "consultations: anyone insert"
  on public.consultations for insert
  with check (true);

drop policy if exists "consultations: self or admin select" on public.consultations;
create policy "consultations: self or admin select"
  on public.consultations for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "consultations: admin update" on public.consultations;
create policy "consultations: admin update"
  on public.consultations for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "consultations: admin delete" on public.consultations;
create policy "consultations: admin delete"
  on public.consultations for delete
  using (public.is_admin());

-- Career positions: public read active; admin write.
drop policy if exists "careers: public read active" on public.career_positions;
create policy "careers: public read active"
  on public.career_positions for select
  using (is_active or public.is_admin());

drop policy if exists "careers: admin write" on public.career_positions;
create policy "careers: admin write"
  on public.career_positions for all
  using (public.is_admin())
  with check (public.is_admin());

-- Job applications: anyone can apply; user sees own; admin sees all.
drop policy if exists "applications: anyone insert" on public.job_applications;
create policy "applications: anyone insert"
  on public.job_applications for insert
  with check (true);

drop policy if exists "applications: self or admin select" on public.job_applications;
create policy "applications: self or admin select"
  on public.job_applications for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "applications: admin update" on public.job_applications;
create policy "applications: admin update"
  on public.job_applications for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "applications: admin delete" on public.job_applications;
create policy "applications: admin delete"
  on public.job_applications for delete
  using (public.is_admin());

-- Contact messages: anyone can send; user sees own; admin sees all.
drop policy if exists "messages: anyone insert" on public.contact_messages;
create policy "messages: anyone insert"
  on public.contact_messages for insert
  with check (true);

drop policy if exists "messages: self or admin select" on public.contact_messages;
create policy "messages: self or admin select"
  on public.contact_messages for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "messages: admin update" on public.contact_messages;
create policy "messages: admin update"
  on public.contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "messages: admin delete" on public.contact_messages;
create policy "messages: admin delete"
  on public.contact_messages for delete
  using (public.is_admin());
