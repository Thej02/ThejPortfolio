import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
let supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase configuration is missing! The VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY variables are not set in your .env file. " +
    "Using placeholder values to prevent startup crash. Create a .env file and fill in your Supabase credentials to enable dynamic database features like projects, certificates, and comments."
  );
  // Fallbacks to prevent client crash
  supabaseUrl = "https://placeholder-project-id.supabase.co";
  supabaseKey = "placeholder-anon-key-to-prevent-boot-crash";
}

export const supabase = createClient(supabaseUrl, supabaseKey);