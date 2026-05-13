import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Schedule a private call with Darrel. Discreet, confidential, no obligation. Las Vegas office, by appointment.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  // Static OSM embed — no API key required, swap to Google Maps Embed for production.
  const lat = site.nap.latitude;
  const lng = site.nap.longitude;
  const bbox = `${lng - 0.02},${lat - 0.01},${lng + 0.02},${lat + 0.01}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <>
      <section className="relative py-24 sm:py-32">
        <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Contact
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Let's start a conversation.
            </h1>
            <p className="mt-8 max-w-3xl text-pretty text-xl text-muted-foreground">
              No pitch, no pressure. Fill in the form below or call directly
              — Darrel personally returns every message within one business day.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <FadeIn className="lg:col-span-3">
              <ContactForm />
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="space-y-6">
                <InfoBlock
                  icon={MapPin}
                  title="Office"
                  body={
                    <>
                      {site.nap.street}
                      <br />
                      {site.nap.city}, {site.nap.region} {site.nap.postalCode}
                    </>
                  }
                />
                <InfoBlock
                  icon={Phone}
                  title="Phone"
                  body={
                    <a
                      href={`tel:${site.nap.phone}`}
                      className="transition-colors hover:text-brand"
                    >
                      {site.nap.phoneDisplay}
                    </a>
                  }
                />
                <InfoBlock
                  icon={Mail}
                  title="Email"
                  body={
                    <a
                      href={`mailto:${site.nap.email}`}
                      className="transition-colors hover:text-brand"
                    >
                      {site.nap.email}
                    </a>
                  }
                />
                <InfoBlock
                  icon={Clock}
                  title="Hours"
                  body={
                    <ul className="space-y-1 text-sm">
                      {site.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-4">
                          <span>{h.day}</span>
                          <span className="text-muted-foreground">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  }
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                src={mapSrc}
                title={`Map of ${site.nap.city} office`}
                width="100%"
                height="420"
                loading="lazy"
                className="block w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
      <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/40 text-brand">
        <Icon className="size-5" aria-hidden />
      </div>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="mt-2 text-foreground/90">{body}</div>
    </div>
  );
}
