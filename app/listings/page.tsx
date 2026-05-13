import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, Ruler } from "lucide-react";
import { FadeIn, Stagger, FadeInChild } from "@/components/motion/fade-in";
import { createServerSupabase } from "@/lib/supabase/server";
import { formatPriceCents } from "@/lib/format";

// Revalidate every 60s — listings change frequently enough that ISR is the right balance.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Current Listings",
  description:
    "Active luxury listings represented by Darrel's Real Estate across Summerlin, Henderson, Lake Las Vegas, and the Vegas valley's guard-gated communities.",
  alternates: { canonical: "/listings" },
};

export default async function ListingsPage() {
  const supabase = await createServerSupabase();
  const { data: listings, error } = await supabase
    .from("listings")
    .select(
      "slug, title, price_cents, neighborhood, beds, baths, sqft, hero_image, is_featured, status",
    )
    .eq("status", "active")
    .order("is_featured", { ascending: false })
    .order("listed_at", { ascending: false });

  // Surface DB issues during dev; in prod we render an empty state.
  if (error) {
    console.error("[/listings] failed to fetch", error);
  }

  return (
    <>
      <section className="relative py-24 sm:py-32">
        <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Listings
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Currently on the market.
            </h1>
            <p className="mt-8 max-w-3xl text-pretty text-xl text-muted-foreground">
              A live look at properties we're actively representing across
              Las Vegas's guard-gated communities. Some homes are shown only
              to qualified buyers — ask about our off-market inventory.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!listings || listings.length === 0 ? (
            <FadeIn>
              <div className="rounded-2xl border border-border bg-card/40 p-10 text-center backdrop-blur">
                <p className="text-muted-foreground">
                  No active listings to show right now. Check back soon — or{" "}
                  <Link href="/contact" className="text-brand hover:underline">
                    reach out
                  </Link>{" "}
                  to hear about off-market opportunities.
                </p>
              </div>
            </FadeIn>
          ) : (
            <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <FadeInChild key={l.slug} as="article" className="h-full">
                  <Link
                    href={`/listings/${l.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-card/60"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {l.hero_image ? (
                        <Image
                          src={l.hero_image}
                          alt={`${l.title} — ${l.neighborhood}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full place-items-center bg-muted text-muted-foreground">
                          No image
                        </div>
                      )}
                      {l.is_featured && (
                        <div className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-foreground">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="font-display text-xl font-medium tracking-tight">
                          {l.title}
                        </h2>
                        <p className="shrink-0 font-display text-lg font-medium text-brand">
                          {formatPriceCents(l.price_cents)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {l.neighborhood}
                      </p>
                      <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="size-4" aria-hidden />
                          {l.beds} bd
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath className="size-4" aria-hidden />
                          {l.baths} ba
                        </span>
                        {l.sqft && (
                          <span className="flex items-center gap-1.5">
                            <Ruler className="size-4" aria-hidden />
                            {l.sqft.toLocaleString()} sf
                          </span>
                        )}
                      </div>
                      <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
                        View listing
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </FadeInChild>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  );
}
