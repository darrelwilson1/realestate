import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import { newsletterSchema } from "@/lib/validation";
import { getDb } from "@/lib/mongodb";
import type { NewsletterSubscriberDoc } from "@/lib/types";

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

  try {
    const db = await getDb();
    await db.collection<Omit<NewsletterSubscriberDoc, "_id">>("newsletter_subscribers").insertOne({
      email: parsed.data.email,
      confirmed: false,
      source: "footer",
      created_at: new Date(),
    });
  } catch (err) {
    // MongoDB duplicate-key error = code 11000. Treat as success so users who
    // signed up twice don't get an error.
    if (err instanceof MongoServerError && err.code === 11000) {
      return NextResponse.json({ ok: true });
    }
    console.error("[newsletter] insert failed", err);
    return NextResponse.json(
      { error: "Could not save. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
