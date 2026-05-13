import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center">
      <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-display text-7xl font-medium tracking-tight text-brand">
          404
        </p>
        <h1 className="mt-6 text-balance font-display text-4xl font-medium tracking-tight sm:text-5xl">
          That page seems to be off-market.
        </h1>
        <p className="mt-6 text-pretty text-lg text-muted-foreground">
          The page you're looking for doesn't exist — or it's been delisted.
          Try one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
