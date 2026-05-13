import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { site } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-[#001f25] p-10 sm:p-16">
            <div className="glow-radial absolute inset-0" aria-hidden />
            <div className="relative max-w-3xl">
              <h2 className="text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Thinking about a move?{" "}
                <span className="bg-gradient-to-r from-brand to-cyan-200 bg-clip-text text-transparent">
                  Let's talk in private.
                </span>
              </h2>
              <p className="mt-5 text-pretty text-lg text-muted-foreground">
                Whether you're a year out from listing or closing in 30 days,
                the first conversation is always free, candid, and confidential.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
                >
                  <Link href="/contact">
                    Schedule a Call <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-border bg-transparent px-6 hover:bg-muted"
                >
                  <a href={`tel:${site.nap.phone}`}>
                    <Phone className="mr-2 size-4" />
                    {site.nap.phoneDisplay}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
