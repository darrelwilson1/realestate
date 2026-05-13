import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Calendar,
  Check,
  MapPin,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { createServerSupabase } from "@/lib/supabase/server";
import { formatPriceCentsFull } from "@/lib/format";
import { site } from "@/lib/site";

export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("listings")
    .select("title, description, hero_image, neighborhood")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (!data) return {};
  return {
    title: data.title,
    description: data.description.slice(0, 160),
    alternates: { canonical: `/listings/${slug}` },
    openGraph: {
      title: `${data.title} — ${data.neighborhood}`,
      description: data.description.slice(0, 200),
      url: `${site.url}/listings/${slug}`,
      images: data.hero_image ? [data.hero_image] : undefined,
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) console.error("[/listings/[slug]] fetch error", error);
  if (!listing) notFound();

  // images is jsonb — narrow to string[].
  const images = Array.isArray(listing.images)
    ? (listing.images as unknown as string[])
    : [];
  const allImages = listing.hero_image
    ? [listing.hero_image, ...images.filter((i) => i !== listing.hero_image)]
    : images;

  return (
    <article>
      <section className="pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            All listings
          </Link>

          <FadeIn>
            <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2">
                <h1 className="text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  {listing.title}
                </h1>
                <p className="mt-4 flex items-center gap-2 text-lg text-muted-foreground">
                  <MapPin className="size-4 text-brand" aria-hidden />
                  {listing.address_street} · {listing.neighborhood}
                </p>
              </div>
              <div className="lg:text-right">
                <p className="font-display text-4xl font-medium tracking-tight text-brand sm:text-5xl">
                  {formatPriceCentsFull(listing.price_cents)}
                </p>
                <p className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">
                  {listing.status === "active" ? "Currently listed" : listing.status}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {allImages.slice(0, 4).map((src, i) => (
                <div
                  key={src}
                  className={
                    i === 0
                      ? "relative col-span-full aspect-[16/9] overflow-hidden rounded-2xl lg:col-span-3 lg:row-span-2 lg:aspect-auto"
                      : "relative aspect-[4/3] overflow-hidden rounded-2xl"
                  }
                >
                  <Image
                    src={src}
                    alt={`${listing.title} — view ${i + 1}`}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 75vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="font-display text-2xl font-medium tracking-tight">
                About this home
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground/85">
                {listing.description}
              </p>

              {listing.features.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-display text-xl font-medium tracking-tight">
                    Features
                  </h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {listing.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-border bg-card/40 p-7 backdrop-blur">
                <h3 className="font-display text-lg font-medium tracking-tight">
                  At a glance
                </h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <Spec icon={BedDouble} label="Bedrooms" value={`${listing.beds}`} />
                  <Spec icon={Bath} label="Bathrooms" value={`${listing.baths}`} />
                  {listing.sqft && (
                    <Spec
                      icon={Ruler}
                      label="Interior"
                      value={`${listing.sqft.toLocaleString()} sqft`}
                    />
                  )}
                  {listing.lot_sqft && (
                    <Spec
                      icon={Ruler}
                      label="Lot"
                      value={`${listing.lot_sqft.toLocaleString()} sqft`}
                    />
                  )}
                  {listing.year_built && (
                    <Spec
                      icon={Calendar}
                      label="Year built"
                      value={`${listing.year_built}`}
                    />
                  )}
                </dl>
                <div className="mt-7">
                  <Button
                    asChild
                    className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                    <Link href="/contact">Schedule a private showing</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </article>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4 text-brand" aria-hidden />
        {label}
      </dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
