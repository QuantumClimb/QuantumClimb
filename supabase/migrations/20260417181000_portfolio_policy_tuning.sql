create index if not exists portfolio_items_created_by_idx
  on public.portfolio_items (created_by);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop policy if exists "Admin users can view themselves" on public.admin_users;
create policy "Admin users can view themselves"
  on public.admin_users
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    or private.is_admin((select auth.uid()))
  );

drop policy if exists "Bootstrap first admin" on public.admin_users;
create policy "Bootstrap or admin insert"
  on public.admin_users
  for insert
  to authenticated
  with check (
    private.is_admin((select auth.uid()))
    or (
      (select auth.uid()) = user_id
      and private.bootstrap_open()
    )
  );

drop policy if exists "Admins manage admin users" on public.admin_users;
create policy "Admins update admin users"
  on public.admin_users
  for update
  to authenticated
  using (private.is_admin((select auth.uid())))
  with check (private.is_admin((select auth.uid())));

create policy "Admins delete admin users"
  on public.admin_users
  for delete
  to authenticated
  using (private.is_admin((select auth.uid())));

drop policy if exists "Public can view published portfolio items" on public.portfolio_items;
create policy "Public can view published portfolio items"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (is_published = true or private.is_admin((select auth.uid())));

drop policy if exists "Admins manage portfolio items" on public.portfolio_items;
create policy "Admins insert portfolio items"
  on public.portfolio_items
  for insert
  to authenticated
  with check (private.is_admin((select auth.uid())));

create policy "Admins update portfolio items"
  on public.portfolio_items
  for update
  to authenticated
  using (private.is_admin((select auth.uid())))
  with check (private.is_admin((select auth.uid())));

create policy "Admins delete portfolio items"
  on public.portfolio_items
  for delete
  to authenticated
  using (private.is_admin((select auth.uid())));

drop policy if exists "Portfolio media admin write" on storage.objects;
create policy "Portfolio media admin insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos')
    and private.is_admin((select auth.uid()))
  );

create policy "Portfolio media admin update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos')
    and private.is_admin((select auth.uid()))
  )
  with check (
    bucket_id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos')
    and private.is_admin((select auth.uid()))
  );

create policy "Portfolio media admin delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos')
    and private.is_admin((select auth.uid()))
  );
