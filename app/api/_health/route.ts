import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

/**
 * Diagnostic endpoint for production debugging.
 * Reports presence of env vars and Supabase reachability without leaking values.
 * Safe to remove once production is healthy.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const env = {
    hasSupabaseUrl: !!url,
    hasSupabaseAnonKey: !!key,
    // Only the first ~25 chars — enough to verify shape, not a usable secret.
    supabaseUrlPreview: url ? url.slice(0, 35) : null,
    supabaseAnonKeyPreview: key ? key.slice(0, 25) + "…" : null,
    nodeEnv: process.env.NODE_ENV ?? null,
    runtime: "nodejs",
  };

  // Try a real query against the database — confirms keys are valid + network is open.
  let supabaseProbe: {
    ok: boolean;
    error?: string;
    rowsReturned?: number;
  } = { ok: false };
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("listings")
      .select("slug")
      .eq("status", "active")
      .limit(1);
    if (error) {
      supabaseProbe = { ok: false, error: error.message };
    } else {
      supabaseProbe = { ok: true, rowsReturned: data?.length ?? 0 };
    }
  } catch (e) {
    supabaseProbe = {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  return NextResponse.json({ env, supabaseProbe }, { status: 200 });
}
