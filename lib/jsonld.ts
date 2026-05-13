import { site } from "./site";

/**
 * Builds LocalBusiness structured data for Google's rich results.
 * Render once in the root layout so every page carries it.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}#business`,
    name: site.name,
    image: `${site.url}${site.ogImage}`,
    url: site.url,
    telephone: site.nap.phone,
    email: site.nap.email,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.nap.street,
      addressLocality: site.nap.city,
      addressRegion: site.nap.region,
      postalCode: site.nap.postalCode,
      addressCountry: site.nap.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.nap.latitude,
      longitude: site.nap.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    sameAs: Object.values(site.social),
    areaServed: {
      "@type": "City",
      name: "Las Vegas",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    sameAs: Object.values(site.social),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}
