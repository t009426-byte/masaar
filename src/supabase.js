import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function normalizeUser(sbUser) {
  if (!sbUser) return null
  return {
    id: sbUser.id,
    name: sbUser.user_metadata?.name || sbUser.email.split('@')[0],
    email: sbUser.email,
  }
}
