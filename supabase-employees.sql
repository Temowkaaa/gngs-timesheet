create table if not exists public.employees (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.employees enable row level security;

drop policy if exists "gngs employees select" on public.employees;
drop policy if exists "gngs employees insert" on public.employees;
drop policy if exists "gngs employees update" on public.employees;
drop policy if exists "gngs employees delete" on public.employees;

create policy "gngs employees select"
on public.employees for select
to anon
using (true);

create policy "gngs employees insert"
on public.employees for insert
to anon
with check (true);

create policy "gngs employees update"
on public.employees for update
to anon
using (true)
with check (true);

create policy "gngs employees delete"
on public.employees for delete
to anon
using (true);
