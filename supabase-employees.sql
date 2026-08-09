create table if not exists public.employees (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.employees enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'gngs employees select'
  ) then
    create policy "gngs employees select"
    on public.employees for select
    to anon
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'gngs employees insert'
  ) then
    create policy "gngs employees insert"
    on public.employees for insert
    to anon
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'gngs employees update'
  ) then
    create policy "gngs employees update"
    on public.employees for update
    to anon
    using (true)
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'gngs employees delete'
  ) then
    create policy "gngs employees delete"
    on public.employees for delete
    to anon
    using (true);
  end if;
end $$;

create table if not exists public.attendance (
  employee_id text not null,
  work_date date not null,
  status text not null,
  hours numeric not null default 0,
  updated_at timestamptz not null default now(),
  primary key (employee_id, work_date)
);

alter table public.attendance enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance'
      and policyname = 'gngs attendance select'
  ) then
    create policy "gngs attendance select"
    on public.attendance for select
    to anon
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance'
      and policyname = 'gngs attendance insert'
  ) then
    create policy "gngs attendance insert"
    on public.attendance for insert
    to anon
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance'
      and policyname = 'gngs attendance update'
  ) then
    create policy "gngs attendance update"
    on public.attendance for update
    to anon
    using (true)
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance'
      and policyname = 'gngs attendance delete'
  ) then
    create policy "gngs attendance delete"
    on public.attendance for delete
    to anon
    using (true);
  end if;
end $$;

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'app_settings'
      and policyname = 'gngs app settings select'
  ) then
    create policy "gngs app settings select"
    on public.app_settings for select
    to anon
    using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'app_settings'
      and policyname = 'gngs app settings insert'
  ) then
    create policy "gngs app settings insert"
    on public.app_settings for insert
    to anon
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'app_settings'
      and policyname = 'gngs app settings update'
  ) then
    create policy "gngs app settings update"
    on public.app_settings for update
    to anon
    using (true)
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'app_settings'
      and policyname = 'gngs app settings delete'
  ) then
    create policy "gngs app settings delete"
    on public.app_settings for delete
    to anon
    using (true);
  end if;
end $$;
