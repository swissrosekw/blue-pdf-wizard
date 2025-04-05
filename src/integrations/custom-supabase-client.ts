
// This file provides a properly typed Supabase client
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = "https://vezbvkngneiwyzdlnqyh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlemJ2a25nbmVpd3l6ZGxucXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTY0MzcsImV4cCI6MjA1OTE5MjQzN30.Z8XKxqn62EAoJsFancpWwN-di_M4ERPpHZDA3JR2ArA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/custom-supabase-client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
