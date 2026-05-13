import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { GalleryGrid } from "@/components/gallery-grid";
import { gallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A selection of recent Las Vegas luxury homes represented by Darrel's Real Estate — Summerlin, Henderson, MacDonald Highlands, Ascaya, Lake Las Vegas.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative py-24 sm:py-32">
        <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Gallery
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              A look at the homes we've represented.
            </h1>
            <p className="mt-8 max-w-3xl text-pretty text-xl text-muted-foreground">
              Click any image for the full view. New properties added monthly.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={gallery} />
        </div>
      </section>
    </>
  );
}
