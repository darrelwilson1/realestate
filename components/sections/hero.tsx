"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Homepage hero. Dark, full-bleed, neon-cyan accent.
 * Animated headline reveals word-by-word (skips if reduced-motion is on).
 */
export function Hero() {
  const prefersReduced = useReducedMotion();
  const headline = ["Las", "Vegas", "luxury,", "sold", "with", "discretion."];

  return (
    <section className="relative isolate overflow-hidden grain">
      {/* Neon radial glow + grid pattern. */}
      <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden
      />

      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <MapPin className="size-3.5 text-brand" aria-hidden />
          Serving Summerlin, Henderson & the Vegas valley
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-[0.25em] inline-block"
            >
              {word === "discretion." ? (
                <span className="bg-gradient-to-r from-brand to-cyan-200 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl"
        >
          Boutique representation across The Ridges, MacDonald Highlands,
          Ascaya, and Lake Las Vegas. Off-market access, cinematic marketing,
          and one direct line — Darrel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-12 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/contact">
              Schedule a Private Call
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-border bg-transparent px-6 hover:bg-muted"
          >
            <Link href="/gallery">View Recent Sales</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 gap-y-6 border-t border-border pt-8 sm:grid-cols-4"
        >
          <Stat value="$340M+" label="Closed since 2019" />
          <Stat value="180+" label="Luxury homes sold" />
          <Stat value="11 days" label="Avg. days on market" />
          <Stat value="98%" label="List-to-sale ratio" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-medium tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
