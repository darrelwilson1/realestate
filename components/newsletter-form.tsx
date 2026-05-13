"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterSchema } from "@/lib/validation";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

/**
 * Footer newsletter capture. Stub submission — wire to ConvertKit / Mailchimp / your ESP.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setPending(true);
    // Replace with real ESP call. The fake delay keeps the UX honest while stubbed.
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    setEmail("");
    toast.success("You're on the list.");
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        className="bg-card"
        required
      />
      <Button
        type="submit"
        disabled={pending}
        aria-label="Subscribe"
        className="bg-brand text-brand-foreground hover:bg-brand/90"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ArrowRight className="size-4" />
        )}
      </Button>
    </form>
  );
}
