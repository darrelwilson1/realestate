import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, Stagger, FadeInChild } from "@/components/motion/fade-in";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on the Las Vegas luxury market — buyer behavior, neighborhood deep-dives, and the occasional rant about staging.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="relative py-24 sm:py-32">
        <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Journal
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Notes from the Vegas luxury market.
            </h1>
            <p className="mt-8 max-w-3xl text-pretty text-xl text-muted-foreground">
              Quarterly market briefings, neighborhood deep-dives, and
              candid takes on what's actually moving the needle in luxury.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet — check back soon.</p>
          ) : (
            <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <FadeInChild key={p.slug} as="article">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block h-full rounded-2xl border border-border bg-card/40 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand/50 hover:bg-card/60"
                  >
                    <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                      <time dateTime={p.date}>
                        {new Date(p.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span>·</span>
                      <span>{p.readingTime}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-pretty text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      Read article
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
