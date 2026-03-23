import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
if (!serviceRole) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");

export const supabaseServer = createClient(url, serviceRole, {
  auth: { persistSession: false },
});
