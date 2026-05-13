import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Building2, Globe2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, FadeInChild } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Darrel — boutique principal broker representing Las Vegas's luxury communities for fourteen years. One client at a time, never a team handoff.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    name: "Darrel",
    role: "Principal Broker",
    bio: "Born in Long Beach, in Vegas since 2009. NV License BS.0190234.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Maya R.",
    role: "Director of Marketing",
    bio: "Former art director at a Mansion Global creative studio.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jordan P.",
    role: "Client Concierge",
    bio: "Handles closings, escrow, and the thousand small details.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
];

const values = [
  {
    icon: Heart,
    title: "Discretion",
    body: "NDAs by default. Private showings. Off-market wherever possible.",
  },
  {
    icon: Award,
    title: "Craft",
    body: "Cinematic photography, video, and editorial-grade copy on every listing.",
  },
  {
    icon: Building2,
    title: "Specialism",
    body: "Only luxury, only Vegas. No condos, no commercial, no distractions.",
  },
  {
    icon: Globe2,
    title: "Reach",
    body: "Active buyers in CA, NY, EU, and the Middle East. WSJ + Mansion Global placement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative py-24 sm:py-32">
        <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              About
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Fourteen years in Vegas luxury, one deal at a time.
            </h1>
            <p className="mt-8 max-w-3xl text-pretty text-xl text-muted-foreground">
              I started Darrel's because I was tired of watching boutique
              clients get handed off to junior agents. Today our book is
              capped at twelve active transactions — by design.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Sunlit luxury home in the Las Vegas foothills"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
                The story
              </p>
              <h2 className="mt-3 text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Why Las Vegas. Why luxury. Why boutique.
              </h2>
              <div className="mt-8 space-y-5 text-pretty text-lg text-zinc-700">
                <p>
                  I moved to Vegas in 2009, fresh out of a UC Berkeley
                  econ degree and the 2008 housing crash. I sold my first
                  Summerlin home in 2011, my first guard-gated property
                  in 2012, and I never looked back.
                </p>
                <p>
                  Vegas is the most under-rated luxury market in the
                  country. Prices are a fraction of comparable
                  Scottsdale, Aspen, or Newport. The architecture is
                  audacious. The tax climate is unmatched. And the
                  buyer pool is more international than anyone realizes.
                </p>
                <p>
                  After a decade at large brokerages, I went independent
                  in 2019. The reason was simple: scale dilutes
                  attention. My clients deserve mine, undivided.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Values
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
              How we work, in four words.
            </h2>
          </FadeIn>
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <FadeInChild key={v.title}>
                  <div className="h-full rounded-2xl border border-border bg-card/40 p-7 backdrop-blur">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted/40 text-brand">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-medium tracking-tight">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {v.body}
                    </p>
                  </div>
                </FadeInChild>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Team
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Small by design.
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Three people, one principal broker, zero handoffs.
            </p>
          </FadeIn>
          <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <FadeInChild key={person.name}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      src={person.image}
                      alt={`Portrait of ${person.name}, ${person.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight">
                    {person.name}
                  </h3>
                  <p className="text-sm text-brand">{person.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {person.bio}
                  </p>
                </div>
              </FadeInChild>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card/40 p-10 text-center sm:p-16">
              <h2 className="text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Ready to talk about your move?
              </h2>
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
                >
                  <Link href="/contact">
                    Schedule a Call <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
