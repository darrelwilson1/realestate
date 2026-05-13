import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, FadeInChild } from "@/components/motion/fade-in";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six luxury real estate services in Las Vegas: buyer representation, seller representation, luxury marketing, relocation, investment acquisition, and private client advisory.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-24 sm:py-32">
        <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Services
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Six services, one principal, every transaction.
            </h1>
            <p className="mt-8 max-w-3xl text-pretty text-xl text-muted-foreground">
              Everything we offer is run by Darrel personally. No outsourcing,
              no white-labeling, no team-by-committee.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <FadeInChild key={s.slug} as="article" className="h-full">
                <div id={s.slug} className="h-full scroll-mt-24">
                  <ServiceCard service={s} detailed className="h-full" />
                </div>
              </FadeInChild>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-[#1a1500] p-10 sm:p-16">
              <div className="max-w-3xl">
                <h2 className="text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
                  Not sure which service fits?
                </h2>
                <p className="mt-5 text-pretty text-lg text-muted-foreground">
                  Most of our clients don't either at first. The first call
                  is a conversation, not a pitch.
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
                  >
                    <Link href="/contact">
                      Start with a Call <ArrowRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
