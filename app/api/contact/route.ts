import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { createServerSupabase } from "@/lib/supabase/server";

// Force Node runtime — Supabase + JS networking is fully supported on Node.
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }

  const { hp, ...payload } = parsed.data;

  // Honeypot tripped — pretend success so the bot moves on quietly.
  if (hp) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await createServerSupabase();
  const userAgent = request.headers.get("user-agent") ?? null;

  const { error } = await supabase.from("contact_submissions").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    interest: payload.interest,
    message: payload.message,
    user_agent: userAgent,
  });

  if (error) {
    console.error("[contact-form] insert failed", error);
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 },
    );
  }

  // TODO: also fire a notification email to Darrel (Resend/SendGrid) so leads
  // don't sit unseen until he checks the dashboard.

  return NextResponse.json({ ok: true });
}
