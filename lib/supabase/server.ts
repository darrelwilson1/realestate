import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/types";

/**
 * Server-side Supabase client. Use inside Server Components, Route Handlers,
 * and Server Actions. Cookie wiring is included for future auth support; today
 * there's no auth so no session is ever written, but @supabase/ssr still
 * requires the adapter to be provided.
 *
 * Must be called per-request — never cache the returned client at module scope.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll throws from Server Components (read-only cookies). Safe to
            // ignore as long as middleware refreshes the session.
          }
        },
      },
    },
  );
}
