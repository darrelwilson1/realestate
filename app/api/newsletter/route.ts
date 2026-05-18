import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";

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

  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: parsed.data.email, source: "footer" });

  if (error) {
    // Postgres unique-violation = 23505. The newsletter_subscribers.email
    // column has a UNIQUE constraint; treat duplicates as success so users
    // who signed up twice don't see an error.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    console.error("[newsletter] insert failed", error);
    return NextResponse.json(
      { error: "Could not save. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
