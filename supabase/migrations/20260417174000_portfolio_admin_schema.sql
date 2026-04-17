create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to postgres, anon, authenticated, service_role;

create or replace function private.is_admin(check_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = check_user_id
  );
$$;

create or replace function private.bootstrap_open()
returns boolean
language sql
security definer
set search_path = public
as $$
  select not exists (
    select 1
    from public.admin_users
  );
$$;

grant execute on function private.is_admin(uuid) to anon, authenticated, service_role;
grant execute on function private.bootstrap_open() to anon, authenticated, service_role;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admin users can view themselves" on public.admin_users;
create policy "Admin users can view themselves"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = user_id or private.is_admin(auth.uid()));

drop policy if exists "Bootstrap first admin" on public.admin_users;
create policy "Bootstrap first admin"
  on public.admin_users
  for insert
  to authenticated
  with check (auth.uid() = user_id and private.bootstrap_open());

drop policy if exists "Admins manage admin users" on public.admin_users;
create policy "Admins manage admin users"
  on public.admin_users
  for all
  to authenticated
  using (private.is_admin(auth.uid()))
  with check (private.is_admin(auth.uid()));

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('video', 'image', 'music', 'website')),
  title text not null,
  slug text unique,
  description text,
  media_url text,
  thumbnail_url text,
  external_url text,
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_items_public_idx
  on public.portfolio_items (content_type, is_published, sort_order, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_items_updated_at on public.portfolio_items;
create trigger set_portfolio_items_updated_at
before update on public.portfolio_items
for each row
execute function public.set_updated_at();

alter table public.portfolio_items enable row level security;

drop policy if exists "Public can view published portfolio items" on public.portfolio_items;
create policy "Public can view published portfolio items"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (is_published = true or private.is_admin(auth.uid()));

drop policy if exists "Admins manage portfolio items" on public.portfolio_items;
create policy "Admins manage portfolio items"
  on public.portfolio_items
  for all
  to authenticated
  using (private.is_admin(auth.uid()))
  with check (private.is_admin(auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('portfolio-images', 'portfolio-images', true, 52428800, array['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('portfolio-audio', 'portfolio-audio', true, 104857600, array['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-wav']),
  ('portfolio-videos', 'portfolio-videos', true, 209715200, array['video/mp4', 'video/webm', 'video/quicktime'])
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Portfolio media public read" on storage.objects;
create policy "Portfolio media public read"
  on storage.objects
  for select
  to public
  using (bucket_id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos'));

drop policy if exists "Portfolio media admin write" on storage.objects;
create policy "Portfolio media admin write"
  on storage.objects
  for all
  to authenticated
  using (
    bucket_id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos')
    and private.is_admin(auth.uid())
  )
  with check (
    bucket_id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos')
    and private.is_admin(auth.uid())
  );
