import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
  /** Detailed cards (services page) show the full description + bullets. */
  detailed?: boolean;
};

export function ServiceCard({ service, className, detailed }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services#${service.slug}`}
      className={cn(
        // Hover lifts the card, brightens the border, glows the icon.
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 p-7 backdrop-blur transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand/50 hover:bg-card/60 hover:shadow-[0_0_60px_-15px_rgb(0_229_255_/_0.3)]",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted/40 text-brand transition-colors group-hover:bg-brand/10">
        <Icon className="size-5" aria-hidden />
      </div>

      <h3 className="mt-6 font-display text-xl font-medium tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {detailed ? service.description : service.short}
      </p>

      {detailed && (
        <ul className="mt-5 space-y-2 text-sm text-foreground/85">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-2 inline-block size-1 rounded-full bg-brand" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
        Learn more
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
