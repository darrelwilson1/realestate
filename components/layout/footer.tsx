import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { site, nav } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

// Brand glyphs as inline SVGs — Lucide removed branded logos due to trademark,
// so we ship the minimal Simple Icons paths instead.
function InstagramGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.155 0-3.522.011-4.768.068-1.064.049-1.642.226-2.026.376-.51.198-.875.435-1.258.818-.383.383-.62.748-.818 1.258-.15.384-.327.962-.376 2.026-.057 1.246-.068 1.613-.068 4.768s.011 3.522.068 4.768c.049 1.064.226 1.642.376 2.026.198.51.435.875.818 1.258.383.383.748.62 1.258.818.384.15.962.327 2.026.376 1.246.057 1.613.068 4.768.068s3.522-.011 4.768-.068c1.064-.049 1.642-.226 2.026-.376.51-.198.875-.435 1.258-.818.383-.383.62-.748.818-1.258.15-.384.327-.962.376-2.026.057-1.246.068-1.613.068-4.768s-.011-3.522-.068-4.768c-.049-1.064-.226-1.642-.376-2.026-.198-.51-.435-.875-.818-1.258-.383-.383-.748-.62-1.258-.818-.384-.15-.962-.327-2.026-.376-1.246-.057-1.613-.068-4.768-.068zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm5.338-8.668a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
    </svg>
  );
}
function FacebookGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.324V1.325C24 .593 23.408 0 22.675 0z" />
    </svg>
  );
}
function LinkedinGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function YoutubeGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight"
          >
            <span className="inline-block size-2 rounded-full bg-brand shadow-[0_0_20px_var(--brand)]" />
            {site.name}
          </Link>
          <p className="mt-4 max-w-sm text-pretty text-sm text-muted-foreground">
            {site.tagline} Boutique representation for buyers and sellers in
            Las Vegas's guard-gated communities.
          </p>
          <div className="mt-8 max-w-md">
            <p className="text-sm font-medium">
              Quarterly market intel, delivered.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Off-market listings and Vegas luxury market briefings. No spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/90 transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Contact
          </h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-foreground/90">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>
                {site.nap.street}
                <br />
                {site.nap.city}, {site.nap.region} {site.nap.postalCode}
              </span>
            </div>
            <a
              href={`tel:${site.nap.phone}`}
              className="flex items-center gap-3 transition-colors hover:text-brand"
            >
              <Phone className="size-4 shrink-0 text-brand" aria-hidden />
              {site.nap.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.nap.email}`}
              className="flex items-center gap-3 transition-colors hover:text-brand"
            >
              <Mail className="size-4 shrink-0 text-brand" aria-hidden />
              {site.nap.email}
            </a>
          </address>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink href={site.social.instagram} label="Instagram">
              <InstagramGlyph className="size-4" />
            </SocialLink>
            <SocialLink href={site.social.facebook} label="Facebook">
              <FacebookGlyph className="size-4" />
            </SocialLink>
            <SocialLink href={site.social.linkedin} label="LinkedIn">
              <LinkedinGlyph className="size-4" />
            </SocialLink>
            <SocialLink href={site.social.youtube} label="YouTube">
              <YoutubeGlyph className="size-4" />
            </SocialLink>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
            Licensed in Nevada · {site.license}
          </p>
          <p className="text-muted-foreground/80">
            Equal Housing Opportunity. Each office is independently owned and operated.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground transition-all hover:border-brand hover:text-brand"
    >
      {children}
    </a>
  );
}
