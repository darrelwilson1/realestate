/* eslint-disable */
/**
 * One-shot seed for the `darrels` MongoDB database.
 *
 * - Creates indexes on listings (slug unique, status+listed_at, is_featured)
 *   and on newsletter_subscribers (email unique).
 * - Upserts 6 sample luxury listings keyed by slug, so re-running converges.
 *
 * Run with:  npm run seed
 *   (which expands to:  node --env-file=.env.local scripts/seed.mjs )
 */

import { MongoClient } from "mongodb";
import dns from "node:dns";

// Some Windows machines have Node's c-ares DNS resolver pointed at 127.0.0.1
// which breaks the SRV lookup needed by mongodb+srv:// URIs. Force public resolvers.
const servers = dns.getServers();
if (servers.length === 0 || servers.every((s) => s === "127.0.0.1" || s === "::1")) {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Did you forget --env-file=.env.local?");
  process.exit(1);
}

const now = new Date();

const listings = [
  {
    slug: "sky-vault-estate-the-ridges",
    title: "Sky-Vault Estate",
    status: "active",
    price_cents: 1495000000,
    address_street: "23 Sky Arc",
    address_city: "Las Vegas",
    address_region: "NV",
    address_postal_code: "89135",
    neighborhood: "The Ridges, Summerlin",
    beds: 6,
    baths: 7.5,
    sqft: 8420,
    lot_sqft: 24500,
    year_built: 2021,
    description:
      "A 2021-vintage modernist estate terraced into the Spring Mountains foothills. Floor-to-ceiling glass, negative-edge pool, and 270-degree views of the valley.",
    hero_image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Negative-edge pool",
      "6-car garage",
      "Smart-home automation",
      "Wine cellar (1,500 bottle)",
      "Detached guest casita",
    ],
    is_featured: true,
  },
  {
    slug: "twilight-macdonald-highlands",
    title: "Twilight at MacDonald Highlands",
    status: "active",
    price_cents: 899500000,
    address_street: "517 Pinnacle Heights Ln",
    address_city: "Las Vegas",
    address_region: "NV",
    address_postal_code: "89012",
    neighborhood: "MacDonald Highlands, Henderson",
    beds: 5,
    baths: 6.0,
    sqft: 6200,
    lot_sqft: 18200,
    year_built: 2019,
    description:
      "Strip-view perch with warm interior glow and DragonRidge country club access. A favorite of out-of-state buyers relocating from California.",
    hero_image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Direct Strip views",
      "DragonRidge club access",
      "Resort-style backyard",
      "Theater room",
    ],
    is_featured: true,
  },
  {
    slug: "cantilever-house-spanish-trail",
    title: "Cantilever House",
    status: "active",
    price_cents: 675000000,
    address_street: "8410 Tournament Cir",
    address_city: "Las Vegas",
    address_region: "NV",
    address_postal_code: "89113",
    neighborhood: "Spanish Trail",
    beds: 4,
    baths: 4.5,
    sqft: 5100,
    lot_sqft: 13400,
    year_built: 2018,
    description:
      "Mid-century inspired exterior with cantilevered roof, stacked-stone walls, and a poolside cabana. Walkable to Spanish Trail Country Club.",
    hero_image:
      "https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Country club access",
      "Cabana + outdoor kitchen",
      "Cantilever roofline",
    ],
    is_featured: false,
  },
  {
    slug: "resort-backyard-lake-las-vegas",
    title: "Resort Backyard",
    status: "active",
    price_cents: 549900000,
    address_street: "12 Costa Tropical Dr",
    address_city: "Las Vegas",
    address_region: "NV",
    address_postal_code: "89011",
    neighborhood: "Lake Las Vegas",
    beds: 5,
    baths: 5.0,
    sqft: 5800,
    lot_sqft: 12100,
    year_built: 2017,
    description:
      "Lakefront resort home with infinity pool, private cabana, and an outdoor kitchen. Sunset views over the lake.",
    hero_image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    ],
    features: [
      "Lakefront",
      "Infinity pool",
      "Private dock",
      "Detached guest house",
    ],
    is_featured: false,
  },
  {
    slug: "cellar-anthem-country-club",
    title: "Cellar at 1500 Bottles",
    status: "active",
    price_cents: 1190000000,
    address_street: "38 Eaglepointe Dr",
    address_city: "Las Vegas",
    address_region: "NV",
    address_postal_code: "89052",
    neighborhood: "Anthem Country Club, Henderson",
    beds: 7,
    baths: 8.0,
    sqft: 9100,
    lot_sqft: 21600,
    year_built: 2020,
    description:
      "Custom Anthem estate with a 1,500-bottle glass-walled cellar, separate guest wing, and a 300-degree panoramic view deck.",
    hero_image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Wine cellar",
      "Guest wing",
      "Anthem CC access",
      "300-degree view deck",
    ],
    is_featured: true,
  },
  {
    slug: "queensridge-strip-view-lounge",
    title: "Strip-View Lounge",
    status: "active",
    price_cents: 459000000,
    address_street: "1632 Liege Dr",
    address_city: "Las Vegas",
    address_region: "NV",
    address_postal_code: "89134",
    neighborhood: "Queensridge",
    beds: 4,
    baths: 4.5,
    sqft: 4400,
    lot_sqft: 10800,
    year_built: 2016,
    description:
      "Sunken living room with a linear fireplace, panoramic Strip views, and a primary suite that occupies its own wing.",
    hero_image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Linear fireplace",
      "Strip view",
      "Primary wing",
      "Walk-in cellar",
    ],
    is_featured: false,
  },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db();
  console.log(`Connected to MongoDB. Using database: ${db.databaseName}`);

  // --- indexes ---
  console.log("Creating indexes...");
  await db.collection("listings").createIndex({ slug: 1 }, { unique: true });
  await db
    .collection("listings")
    .createIndex({ status: 1, listed_at: -1 }, { name: "status_listed_at" });
  await db
    .collection("listings")
    .createIndex({ is_featured: 1 }, { partialFilterExpression: { is_featured: true } });
  await db
    .collection("newsletter_subscribers")
    .createIndex({ email: 1 }, { unique: true });
  await db
    .collection("contact_submissions")
    .createIndex({ created_at: -1 });

  // --- upsert listings ---
  console.log(`Upserting ${listings.length} listings...`);
  const bulk = listings.map((l) => ({
    updateOne: {
      filter: { slug: l.slug },
      update: {
        $set: { ...l, listed_at: now, updated_at: now },
        $setOnInsert: { created_at: now },
      },
      upsert: true,
    },
  }));
  const result = await db.collection("listings").bulkWrite(bulk);
  console.log(
    `  inserted=${result.upsertedCount}, modified=${result.modifiedCount}, matched=${result.matchedCount}`,
  );

  const total = await db.collection("listings").countDocuments();
  console.log(`Done. Listings in DB: ${total}`);
} catch (err) {
  console.error("Seed failed:", err);
  process.exit(1);
} finally {
  await client.close();
}
