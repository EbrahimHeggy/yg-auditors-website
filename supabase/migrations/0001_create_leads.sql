-- Run this in the Supabase SQL editor for this project.
-- Stores consultation form submissions from the public website.

-- Column lengths match the server-side MAX_LEN limits in functions/api/consultation.ts.
-- The anon key has public insert rights, so anyone could POST directly to PostgREST
-- bypassing the Function — these bounds defend against oversized/abusive inserts.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name varchar(200) not null,
  email varchar(200) not null,
  message varchar(5000) not null,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- The website's anon key may only ever insert — never read, update, or delete leads.
create policy "Anon can submit leads"
  on public.leads
  for insert
  to anon
  with check (true);
