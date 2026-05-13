/**
 * Format a price in cents as a USD short string ("$1.49M", "$899K", "$3,200").
 * Above $1M uses one decimal of M; above $1K uses K; otherwise plain dollars.
 */
export function formatPriceCents(cents: number): string {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) {
    const m = dollars / 1_000_000;
    // 1 decimal unless the trailing digit is 0 (then drop it).
    return `$${m.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (dollars >= 1_000) {
    return `$${Math.round(dollars / 1_000)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(dollars);
}

/**
 * Full-precision price for detail pages — "$1,495,000".
 */
export function formatPriceCentsFull(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
