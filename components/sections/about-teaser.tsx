import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * Light-on-dark section — establishes Darrel's story. Uses .section-light to flip
 * the token palette for the embedded content while keeping the global dark theme.
 */
export function AboutTeaser() {
  return (
    <section className="section-light relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
                alt="Darrel — principal broker at Darrel's Real Estate, Las Vegas"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur">
                <p className="font-display text-lg font-medium tracking-tight">
                  Darrel
                </p>
                <p className="text-sm text-zinc-600">
                  Principal Broker · 14 years in Las Vegas luxury
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
              About
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
              I work one deal at a time.
            </h2>
            <div className="mt-6 space-y-5 text-pretty text-lg text-zinc-700">
              <p>
                I founded Darrel's after a decade at two of Vegas's biggest
                brokerages. Big teams are great for volume. They're terrible
                for the kind of client who values being known, not numbered.
              </p>
              <p>
                Today I cap my book at twelve active transactions. Every
                client gets my cell. Every showing is run by me. Every
                negotiation is mine to win.
              </p>
              <p>
                If that's the kind of representation you've been looking for,
                let's talk.
              </p>
            </div>
            <div className="mt-8">
              <Button
                asChild
                className="h-12 bg-zinc-900 px-6 text-white hover:bg-zinc-800"
              >
                <Link href="/about">
                  More about Darrel <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
