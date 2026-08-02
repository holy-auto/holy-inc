import { supabase } from './supabase';

export type ContactSource = 'contact' | 'home' | 'careers';

/**
 * Persist a website form submission to Supabase.
 *
 * Common fields (name/email/message) are stored in dedicated columns; the full
 * raw field set is kept in `payload` so nothing is lost regardless of which
 * form it came from (phone, company, subject, inquiry_type, position, ...).
 * Throws on failure so callers can surface an error state.
 */
export async function submitContactForm(
  source: ContactSource,
  fields: Record<string, string>,
): Promise<void> {
  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  const message = (fields.message || '').trim();

  const { error } = await supabase.from('contact_submissions').insert({
    source,
    name,
    email,
    message: message || null,
    payload: fields,
  });

  if (error) throw error;
}

/** Collect all named field values from a form element into a plain object. */
export function collectFormFields(form: HTMLFormElement): Record<string, string> {
  const fields: Record<string, string> = {};
  const data = new FormData(form);
  data.forEach((value, key) => {
    if (typeof value === 'string') fields[key] = value;
  });
  return fields;
}
