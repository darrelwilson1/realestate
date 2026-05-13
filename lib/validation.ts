import { z } from "zod";

/**
 * Contact form schema — shared between client (RHF resolver) and server (API route).
 * Mirror any changes on both sides; the route re-validates server-side.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(40, "Phone is too long")
    .optional()
    .or(z.literal("")),
  interest: z.enum(["buying", "selling", "relocation", "investment", "other"], {
    message: "Please select an option",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more — at least 10 characters")
    .max(2000, "Message is too long"),
  // Honeypot — humans leave it blank. Bots fill it. Reject when non-empty.
  hp: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
