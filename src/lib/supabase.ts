import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Credentials come from env (VITE_ vars are public by design; data is protected
// by Postgres row-level security). If they're absent the app runs fully in
// localStorage-only mode and no auth UI is shown.
const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(url && anon)

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url as string, anon as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null
