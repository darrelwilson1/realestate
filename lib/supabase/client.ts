import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/types";

/**
 * Browser-side Supabase client. Use inside Client Components when you need to
 * read or write from the user's browser (e.g. realtime subscriptions, optimistic
 * UI). Forms in this app currently POST to /api/* route handlers instead, so
 * this helper is here for future use but isn't called yet.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
