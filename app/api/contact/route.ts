import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getDb } from "@/lib/mongodb";
import type { ContactSubmissionDoc } from "@/lib/types";

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
  // Honeypot — humans leave it blank, bots fill it. Silent success keeps them quiet.
  if (hp) return NextResponse.json({ ok: true });

  try {
    const db = await getDb();
    await db.collection<Omit<ContactSubmissionDoc, "_id">>("contact_submissions").insertOne({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      interest: payload.interest,
      message: payload.message,
      user_agent: request.headers.get("user-agent") ?? null,
      status: "new",
      created_at: new Date(),
    });
  } catch (err) {
    console.error("[contact-form] insert failed", err);
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 },
    );
  }

  // TODO: fire a notification email to Darrel (Resend/SendGrid) so leads
  // don't sit unseen until he checks the dashboard.

  return NextResponse.json({ ok: true });
}
