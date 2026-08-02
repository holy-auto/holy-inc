import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for the public website.
 *
 * The URL and publishable (anon) key are safe to ship in the client bundle —
 * that is what publishable keys are for. Access is constrained by Row Level
 * Security: the `contact_submissions` table only permits INSERT from anon, and
 * exposes no read/update/delete. Values can still be overridden at build time
 * via Vite env vars if you prefer to keep them out of the repo.
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://cxlrcwcebgljjsxnmlkm.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_AKMnAOOa6AagtT0zkdMt-Q__LEOK8RC';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
