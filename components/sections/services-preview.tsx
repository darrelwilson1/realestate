import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, FadeInChild } from "@/components/motion/fade-in";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/services";

export function ServicesPreview() {
  // Preview shows first four — full list lives on /services.
  const preview = services.slice(0, 4);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              What we do
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
              A full-service desk, run by one principal.
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Every client works directly with Darrel — no junior agents, no
              handoffs. Six core service lines, all run in-house.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-fit border-border bg-transparent hover:bg-muted"
          >
            <Link href="/services">
              All services <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </FadeIn>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((s) => (
            <FadeInChild key={s.slug}>
              <ServiceCard service={s} />
            </FadeInChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
