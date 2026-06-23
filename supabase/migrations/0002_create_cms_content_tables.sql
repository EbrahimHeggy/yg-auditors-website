-- Run this in the Supabase SQL editor for this project.
-- Creates the content tables backing the Refine admin app (admin-app/),
-- replacing the old git-JSON-file content source. Prefixed cms_ to stay
-- clearly separate from the unrelated `leads` table.
--
-- RLS model: anon (the public website's build-time fetch) gets read-only
-- access since this content is already 100% public on the live site.
-- authenticated (any real logged-in Supabase user added for admin access)
-- gets full read/write — there is no separate "editor" role distinction.

create table if not exists public.cms_hero (
  id text primary key,
  badge text not null,
  phrases jsonb not null default '[]',
  subheadline text not null,
  cta1 text not null,
  cta2 text not null,
  stats jsonb not null default '[]'
);

create table if not exists public.cms_about (
  id text primary key,
  badge text not null,
  title text not null,
  story text not null,
  detail text not null,
  promise text not null,
  highlights jsonb not null default '[]',
  stats jsonb not null default '[]'
);

create table if not exists public.cms_services (
  id text primary key,
  badge text not null,
  title text not null,
  sub text not null,
  hint text not null,
  services jsonb not null default '[]',
  stats jsonb not null default '[]'
);

create table if not exists public.cms_qualifications (
  id text primary key,
  badge text not null,
  title text not null,
  sub text not null,
  memberships jsonb not null default '{}',
  approvals jsonb not null default '{}'
);

create table if not exists public.cms_consultant (
  id text primary key,
  badge text not null,
  title text not null,
  sub text not null,
  name_placeholder text not null,
  email_placeholder text not null,
  message_placeholder text not null,
  submit text not null,
  info jsonb not null default '[]'
);

create table if not exists public.cms_team_section (
  id text primary key,
  badge text not null,
  title text not null,
  sub text not null,
  labels jsonb not null default '{}'
);

create table if not exists public.cms_contact_section (
  id text primary key,
  badge text not null,
  title text not null,
  sub text not null
);

create table if not exists public.cms_team (
  id text primary key,
  name text not null,
  arabic_name text not null,
  credentials text not null,
  full_title text not null,
  role jsonb not null default '{}',
  designation text not null,
  photo text not null,
  bio jsonb not null default '{}',
  certificate text,
  qualifications jsonb not null default '[]',
  specializations jsonb not null default '[]',
  social jsonb not null default '{}'
);

create table if not exists public.cms_contact_info (
  id text primary key,
  contact jsonb not null default '{}',
  external_links jsonb not null default '[]'
);

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'cms_hero', 'cms_about', 'cms_services', 'cms_qualifications', 'cms_consultant',
    'cms_team_section', 'cms_contact_section', 'cms_team', 'cms_contact_info'
  ])
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format(
      'create policy "Anon can read %1$I" on public.%1$I for select to anon using (true)',
      t
    );
    execute format(
      'create policy "Authenticated can manage %1$I" on public.%1$I for all to authenticated using (true) with check (true)',
      t
    );
  end loop;
end $$;
