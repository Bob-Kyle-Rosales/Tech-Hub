import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string | undefined = process.env.VITE_SUPABASE_URL;
const supabaseKey: string | undefined = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in the environment',
  );
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
