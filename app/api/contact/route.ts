import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

// Force Node runtime — needed if/when we wire to an SMTP / Resend / SendGrid SDK.
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

  // TODO: replace this stub with a real transactional email send.
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "leads@darrelsrealestate.com",
  //     to: "darrel@darrelsrealestate.com",
  //     subject: `New inquiry from ${payload.name}`,
  //     text: JSON.stringify(payload, null, 2),
  //   });
  console.log("[contact-form]", payload);

  return NextResponse.json({ ok: true });
}
