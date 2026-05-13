"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_MS = 7000;

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance unless the user is interacting (paused) or prefers reduced motion.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      AUTO_ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[index];

  return (
    <section className="relative py-24 sm:py-32">
      <div
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-brand">
          From clients
        </p>
        <h2 className="mt-3 text-center text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Words from the people we've represented.
        </h2>

        <div className="relative mt-14 min-h-[300px] sm:min-h-[260px]">
          <Quote
            className="pointer-events-none absolute -top-2 left-1/2 size-14 -translate-x-1/2 text-brand/15"
            aria-hidden
          />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-3xl text-center"
            >
              <blockquote className="text-balance font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{t.name}</span>
                {" · "}
                {t.role}
                <span className="block text-muted-foreground/70">
                  {t.location}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() =>
              setIndex(
                (i) => (i - 1 + testimonials.length) % testimonials.length,
              )
            }
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-brand" : "w-1.5 bg-muted-foreground/40",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
