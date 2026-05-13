"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

const interestOptions: { value: ContactInput["interest"]; label: string }[] = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "relocation", label: "Relocation" },
  { value: "investment", label: "Investment" },
  { value: "other", label: "Just exploring" },
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interest: "buying", hp: "" },
  });

  const [pending, setPending] = useState(false);
  const interest = watch("interest");

  async function onSubmit(values: ContactInput) {
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong");
      }
      toast.success("Got it. Darrel will reply within one business day.");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-3xl border border-border bg-card/40 p-8 backdrop-blur sm:p-10"
    >
      {/* Honeypot — visually hidden, screen-readers skip, bots don't. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Leave this field blank
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("hp")}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          error={errors.name?.message}
          htmlFor="name"
        >
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            {...register("name")}
          />
        </Field>
        <Field
          label="Email"
          error={errors.email?.message}
          htmlFor="email"
        >
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            {...register("email")}
          />
        </Field>
      </div>

      <Field
        label="Phone (optional)"
        error={errors.phone?.message}
        htmlFor="phone"
      >
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(702) 555-0188"
          {...register("phone")}
        />
      </Field>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">I'm interested in...</legend>
        <div className="flex flex-wrap gap-2 pt-1">
          {interestOptions.map((opt) => {
            const active = interest === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("interest", opt.value)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                  active
                    ? "border-brand bg-brand/15 text-brand"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {errors.interest && (
          <p className="text-xs text-red-400">{errors.interest.message}</p>
        )}
      </fieldset>

      <Field
        label="Message"
        error={errors.message?.message}
        htmlFor="message"
      >
        <Textarea
          id="message"
          rows={5}
          placeholder="Where are you in your process? Any specific neighborhoods, timelines, or budget in mind?"
          {...register("message")}
        />
      </Field>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          We reply within one business day. No mailing list, no spam.
        </p>
        <Button
          type="submit"
          disabled={pending}
          className="h-11 bg-brand px-5 text-brand-foreground hover:bg-brand/90"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
