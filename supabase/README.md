# Supabase（お問い合わせ・採用フォームのバックエンド）

- プロジェクト: `holy-inc`（ref: `cxlrcwcebgljjsxnmlkm`）
- ダッシュボード: https://supabase.com/dashboard/project/cxlrcwcebgljjsxnmlkm
- `migrations/` は本番プロジェクトに適用済みの SQL を管理用に保存したものです。

## 仕組み

| ファイル | 内容 |
|---|---|
| `0001_contact_submissions.sql` | フォーム送信を保存する `contact_submissions` テーブル（anon は INSERT のみ可） |
| `0002_contact_notifications.sql` | INSERT 時に Slack / メールへ通知するトリガー（`pg_net` で非同期送信） |

通知先は Supabase **Vault** のシークレットで設定します。未設定のチャンネルはスキップされ、
通知に失敗してもフォーム送信自体は失敗しません。

## 通知の設定手順

ダッシュボードの **SQL Editor** で以下を実行します。

### Slack

Slack で Incoming Webhook を作成し（https://api.slack.com/messaging/webhooks）、URL を登録:

```sql
select vault.create_secret('https://hooks.slack.com/services/XXX/YYY/ZZZ', 'contact_slack_webhook_url');
```

### メール（Resend）

https://resend.com で API キーを発行し、送信元ドメイン（例: `holy-inc.jp`）を認証したうえで登録:

```sql
select vault.create_secret('re_xxxxxxxxxxxx',                       'contact_resend_api_key');
select vault.create_secret('info@holy-auto.com, other@example.com', 'contact_notify_email_to');   -- カンマ区切りで複数可
select vault.create_secret('HOLY Website <noreply@holy-inc.jp>',    'contact_notify_email_from');
```

通知メールの `Reply-To` は送信者のメールアドレスになるので、そのまま返信できます。

### 値を変更する

```sql
update vault.secrets set secret = '新しい値' where name = 'contact_slack_webhook_url';
```

## テスト・再送

既存の行を使って通知を手動で送信できます（設定確認用）:

```sql
select private.notify_contact_submission(id)
from public.contact_submissions
order by created_at desc
limit 1;
```

送信結果（HTTP ステータス）は `pg_net` の応答テーブルで確認できます:

```sql
select id, created, status_code, error_msg, left(content, 200) as content
from net._http_response
order by id desc
limit 10;
```
