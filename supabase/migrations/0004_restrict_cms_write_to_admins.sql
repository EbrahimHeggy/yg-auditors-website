-- 0002 granted full read/write on every cms_* table to any authenticated
-- user. That's too broad: if public sign-ups are ever re-enabled (or any
-- other authenticated feature is added to this project later), any logged-in
-- account — not just the people we intend as content admins — would get
-- full control over site content. This swaps that policy for one that also
-- requires an "admin" role in the user's JWT app_metadata.

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'cms_hero', 'cms_about', 'cms_services', 'cms_qualifications', 'cms_consultant',
    'cms_team_section', 'cms_contact_section', 'cms_team', 'cms_contact_info'
  ])
  loop
    execute format('drop policy if exists "Authenticated can manage %1$I" on public.%1$I', t);
    execute format(
      'create policy "Admins can manage %1$I" on public.%1$I for all to authenticated using ((auth.jwt() -> ''app_metadata'' -> ''roles'') ? ''admin'') with check ((auth.jwt() -> ''app_metadata'' -> ''roles'') ? ''admin'')',
      t
    );
  end loop;
end $$;

-- After running this, grant the admin role to each real content-editor
-- account (one-time per user), e.g. in the SQL editor:
--
-- update auth.users
-- set raw_app_meta_data = raw_app_meta_data || '{"roles": ["admin"]}'::jsonb
-- where email = 'someone@example.com';
