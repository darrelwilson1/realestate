import { MongoClient, type Db } from "mongodb";
import dns from "node:dns";

/**
 * MongoDB connection helper for Next.js (App Router).
 *
 * Design notes:
 * - Connection is initialized lazily on first call to getDb(), so importing
 *   this module never opens a socket at build time (Hostinger builds otherwise
 *   try to connect to the cluster during page-data collection and stall).
 * - In dev, the client is cached on globalThis so HMR doesn't leak connections.
 * - In prod, the client is cached at module scope (one per serverless instance).
 * - The database name comes from the URI (`/darrels` in our case).
 * - mongodb+srv:// requires SRV/TXT lookups via Node's c-ares resolver, which
 *   on some Windows machines defaults to `127.0.0.1` and fails with ECONNREFUSED.
 *   We force public resolvers (Cloudflare + Google) before any lookup.
 */

// Force public DNS resolvers for c-ares (used by mongodb+srv:// SRV/TXT lookups).
// Node's default c-ares DNS list on this Windows machine resolves to broken values
// (127.0.0.1 in the shell, sometimes empty inside Next.js), so we override
// unconditionally. dns.lookup() (used by net.connect) is unaffected — it always
// uses the OS resolver via getaddrinfo.
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let prodClientPromise: Promise<MongoClient> | undefined;

function buildClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local locally and to the Hostinger Node.js app's environment variables in production.",
    );
  }
  return new MongoClient(uri).connect();
}

export async function getDb(): Promise<Db> {
  if (process.env.NODE_ENV === "development") {
    globalThis._mongoClientPromise ??= buildClient();
    return (await globalThis._mongoClientPromise).db();
  }
  prodClientPromise ??= buildClient();
  return (await prodClientPromise).db();
}
