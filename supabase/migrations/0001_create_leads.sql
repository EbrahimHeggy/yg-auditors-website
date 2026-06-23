-- Run this in the Supabase SQL editor for this project.
-- Stores consultation form submissions from the public website.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- The website's anon key may only ever insert — never read, update, or delete leads.
create policy "Anon can submit leads"
  on public.leads
  for insert
  to anon
  with check (true);
