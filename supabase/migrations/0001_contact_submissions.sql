-- Backend for the holy-inc website contact / careers forms.
-- Applied to Supabase project "holy-inc" (ref: cxlrcwcebgljjsxnmlkm).
-- Kept here for reproducibility / version control.

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  source      text not null check (source in ('contact', 'home', 'careers')),
  name        text not null,
  email       text not null,
  message     text,
  payload     jsonb not null default '{}'::jsonb
);

comment on table public.contact_submissions is 'Submissions from the holy-inc website contact/careers forms.';

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- Anyone (anon) may submit; nobody may read/update/delete through the API
-- (only the service role / dashboard). Basic validation curbs junk/oversized rows.
drop policy if exists "Public can submit contact forms" on public.contact_submissions;
create policy "Public can submit contact forms"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (
    source in ('contact', 'home', 'careers')
    and char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    and (message is null or char_length(message) <= 5000)
    and pg_column_size(payload) <= 20000
  );
