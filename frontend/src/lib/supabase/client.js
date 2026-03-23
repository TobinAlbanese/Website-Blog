// lib/supabase/client.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});


export const POST_IMAGES_BUCKET = "post-images";
export const PUBLIC_IMAGES_BUCKET = "public-images";


export function storagePathToPublicUrl(storagePath, bucket = POST_IMAGES_BUCKET) {
  if (!storagePath) return "";
  if (/^https?:\/\//i.test(storagePath)) return storagePath;

  return (
    supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl || ""
  );
}


export const postImageUrl = (storagePath) =>
  storagePathToPublicUrl(storagePath, POST_IMAGES_BUCKET);

export const publicImageUrl = (storagePath) =>
  storagePathToPublicUrl(storagePath, PUBLIC_IMAGES_BUCKET);

export const BUCKET = POST_IMAGES_BUCKET;
