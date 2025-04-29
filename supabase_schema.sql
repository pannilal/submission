create table if not exists tracker_data (
  id text primary key,
  class_name text,
  data jsonb
);
create table if not exists period_tracker (
  class text,
  date date,
  roll int,
  name text,
  book text,
  notebook text,
  attendance text
);
alter table tracker_data enable row level security;
alter table period_tracker enable row level security;
create policy "Allow anon full access" on tracker_data for all using (true) with check (true);
create policy "Allow anon full access" on period_tracker for all using (true) with check (true);