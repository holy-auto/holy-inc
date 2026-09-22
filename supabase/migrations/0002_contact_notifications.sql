-- Notifications for new contact / careers form submissions.
-- Applied to Supabase project "holy-inc" (ref: cxlrcwcebgljjsxnmlkm).
--
-- Every INSERT into public.contact_submissions fires an AFTER trigger that
-- posts (asynchronously, via pg_net) to:
--   * Slack  – an Incoming Webhook URL
--   * Email  – the Resend API (https://resend.com)
--
-- Both channels are optional and are configured through Supabase Vault
-- secrets (Dashboard > Project Settings > Vault, or SQL). A channel whose
-- secrets are missing is skipped with a NOTICE; a notification failure never
-- blocks the form submission itself.
--
--   select vault.create_secret('https://hooks.slack.com/services/XXX/YYY/ZZZ', 'contact_slack_webhook_url');
--   select vault.create_secret('re_xxxxxxxxx',                                 'contact_resend_api_key');
--   select vault.create_secret('info@holy-auto.com, other@example.com',       'contact_notify_email_to');
--   select vault.create_secret('HOLY Website <noreply@holy-inc.jp>',          'contact_notify_email_from');
--
-- To update a secret later:
--   update vault.secrets set secret = '...' where name = 'contact_slack_webhook_url';
--
-- To (re)send the notification for an existing row (e.g. to test the setup):
--   select private.notify_contact_submission(id) from public.contact_submissions order by created_at desc limit 1;

create extension if not exists pg_net with schema extensions;

-- Private schema: not exposed through PostgREST, so nothing here is callable
-- from the public API.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Secret lookup
-- ---------------------------------------------------------------------------
create or replace function private.contact_secret(p_name text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select nullif(btrim(s.decrypted_secret), '')
  from vault.decrypted_secrets s
  where s.name = p_name
  order by s.created_at desc
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- Message formatting
-- ---------------------------------------------------------------------------
create or replace function private.contact_source_label(p_source text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case p_source
    when 'contact' then 'お問い合わせフォーム'
    when 'home'    then 'トップページ お問い合わせ'
    when 'careers' then '採用エントリー'
    else coalesce(p_source, '不明')
  end;
$$;

create or replace function private.contact_inquiry_type_label(p_type text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case p_type
    when 'general'      then '一般的なお問い合わせ'
    when 'coating'      then '施工・コーティング相談'
    when 'ppf'          then 'PPF・フィルム相談'
    when 'ledra'        then 'Ledra（ブロックチェーン）契約'
    when 'mobilewash'   then 'MobileWash（出張洗車）契約'
    when 'construction' then '施工相談・見積もり'
    when 'career'       then '採用・エントリー'
    when 'media'        then '取材・メディア掲載'
    when 'other'        then 'その他'
    else p_type
  end;
$$;

create or replace function private.contact_method_label(p_method text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case p_method
    when 'email' then 'メール'
    when 'phone' then '電話'
    when 'both'  then 'どちらでも'
    else p_method
  end;
$$;

-- Plain-text body shared by Slack (mrkdwn-safe) and email.
create or replace function private.contact_notification_text(r public.contact_submissions)
returns text
language plpgsql
stable
set search_path = ''
as $$
declare
  p      jsonb := coalesce(r.payload, '{}'::jsonb);
  lines  text[] := '{}';
  jst    text := to_char(r.created_at at time zone 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI');
begin
  lines := array_append(lines, format('種別: %s', private.contact_source_label(r.source)));
  lines := array_append(lines, format('受信日時: %s (JST)', jst));
  lines := array_append(lines, format('お名前: %s', r.name));
  lines := array_append(lines, format('メール: %s', r.email));

  if coalesce(p->>'phone', '') <> '' then
    lines := array_append(lines, format('電話: %s', p->>'phone'));
  end if;
  if coalesce(p->>'company', '') <> '' then
    lines := array_append(lines, format('会社名: %s', p->>'company'));
  end if;
  if coalesce(p->>'inquiry_type', '') <> '' then
    lines := array_append(lines, format('お問い合わせ種別: %s', private.contact_inquiry_type_label(p->>'inquiry_type')));
  end if;
  if coalesce(p->>'subject', '') <> '' then
    lines := array_append(lines, format('件名: %s', p->>'subject'));
  end if;
  if coalesce(p->>'position', '') <> '' then
    lines := array_append(lines, format('応募職種: %s', p->>'position'));
  end if;
  if coalesce(p->>'contact_method', '') <> '' then
    lines := array_append(lines, format('希望連絡方法: %s', private.contact_method_label(p->>'contact_method')));
  end if;

  lines := array_append(lines, '');
  lines := array_append(lines, '--- 内容 ---');
  lines := array_append(lines, coalesce(nullif(btrim(r.message), ''), '(本文なし)'));
  lines := array_append(lines, '');
  lines := array_append(lines, format('ID: %s', r.id));

  return array_to_string(lines, E'\n');
end;
$$;

create or replace function private.contact_notification_subject(r public.contact_submissions)
returns text
language sql
stable
set search_path = ''
as $$
  select format('【%s】%s 様より', private.contact_source_label(r.source), r.name);
$$;

-- ---------------------------------------------------------------------------
-- Senders
-- ---------------------------------------------------------------------------
create or replace function private.contact_notify_slack(r public.contact_submissions)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  webhook text := private.contact_secret('contact_slack_webhook_url');
  body    jsonb;
begin
  if webhook is null then
    raise notice 'contact notification: Slack skipped (secret contact_slack_webhook_url not set)';
    return null;
  end if;

  body := jsonb_build_object(
    'text',
    format(E':email: *新着 %s*\n```%s```\n<https://supabase.com/dashboard/project/cxlrcwcebgljjsxnmlkm/editor|Supabase で確認>',
      private.contact_source_label(r.source),
      private.contact_notification_text(r))
  );

  return net.http_post(
    url     := webhook,
    body    := body,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    timeout_milliseconds := 10000
  );
end;
$$;

create or replace function private.contact_notify_email(r public.contact_submissions)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  api_key   text := private.contact_secret('contact_resend_api_key');
  mail_to   text := private.contact_secret('contact_notify_email_to');
  mail_from text := private.contact_secret('contact_notify_email_from');
  recipients text[];
  body      jsonb;
begin
  if api_key is null or mail_to is null or mail_from is null then
    raise notice 'contact notification: email skipped (set contact_resend_api_key, contact_notify_email_to, contact_notify_email_from)';
    return null;
  end if;

  select array_agg(btrim(x)) into recipients
  from unnest(string_to_array(mail_to, ',')) as x
  where btrim(x) <> '';

  body := jsonb_build_object(
    'from',     mail_from,
    'to',       to_jsonb(recipients),
    'reply_to', r.email,
    'subject',  private.contact_notification_subject(r),
    'text',     private.contact_notification_text(r)
      || E'\n\n' || 'Supabase: https://supabase.com/dashboard/project/cxlrcwcebgljjsxnmlkm/editor'
  );

  return net.http_post(
    url     := 'https://api.resend.com/emails',
    body    := body,
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || api_key
    ),
    timeout_milliseconds := 10000
  );
end;
$$;

-- Send to every configured channel. Never raises: a broken notification
-- must not reject the form submission.
create or replace function private.notify_contact_submission(p_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.contact_submissions;
begin
  select * into r from public.contact_submissions where id = p_id;
  if not found then
    raise notice 'contact notification: submission % not found', p_id;
    return;
  end if;

  begin
    perform private.contact_notify_slack(r);
  exception when others then
    raise warning 'contact notification: Slack failed for %: %', p_id, sqlerrm;
  end;

  begin
    perform private.contact_notify_email(r);
  exception when others then
    raise warning 'contact notification: email failed for %: %', p_id, sqlerrm;
  end;
end;
$$;

-- ---------------------------------------------------------------------------
-- Trigger
-- ---------------------------------------------------------------------------
create or replace function private.on_contact_submission_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.notify_contact_submission(new.id);
  return new;
end;
$$;

drop trigger if exists contact_submissions_notify on public.contact_submissions;
create trigger contact_submissions_notify
  after insert on public.contact_submissions
  for each row
  execute function private.on_contact_submission_insert();

-- Lock down: only the owner (postgres / dashboard) may call these directly.
revoke all on all functions in schema private from public, anon, authenticated;
alter default privileges in schema private revoke execute on functions from public, anon, authenticated;
