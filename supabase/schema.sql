-- VH26 — per-user data store.
-- Run this once in your Supabase project (SQL Editor → New query → Run).
-- Each user gets one row; row-level security ensures users see only their own data.

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- One policy covers select / insert / update / delete for the owner.
drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile"
  on public.profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);
