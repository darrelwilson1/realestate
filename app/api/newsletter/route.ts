import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { createServerSupabase } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid email" },
      { status: 422 },
    );
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: parsed.data.email, source: "footer" });

  // Postgres unique-violation code = 23505. Treat dupes as success so users
  // who signed up twice don't get an error.
  if (error && error.code !== "23505") {
    console.error("[newsletter] insert failed", error);
    return NextResponse.json(
      { error: "Could not save. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
