
-- SQL schema setup for tracker_data
create table if not exists tracker_data (
  id text primary key,
  class_name text,
  data jsonb
);

-- Enable RLS
alter table tracker_data enable row level security;

-- Allow full access to anon users
create policy "Allow anon full access"
  on tracker_data
  for all
  using (true)
  with check (true);
