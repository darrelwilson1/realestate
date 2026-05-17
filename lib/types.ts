import type { ObjectId } from "mongodb";

/**
 * Document shapes for the three MongoDB collections.
 * Field names mirror the original Supabase schema so the UI components didn't
 * have to be rewritten when we migrated.
 */

export type ListingStatus = "active" | "pending" | "sold" | "off_market";

export interface ListingDoc {
  _id: ObjectId;
  slug: string;
  title: string;
  status: ListingStatus;
  price_cents: number;
  address_street: string;
  address_city: string;
  address_region: string;
  address_postal_code?: string | null;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft?: number | null;
  lot_sqft?: number | null;
  year_built?: number | null;
  description: string;
  hero_image?: string | null;
  images: string[];
  features: string[];
  is_featured: boolean;
  listed_at: Date;
  created_at: Date;
  updated_at: Date;
}

export type ContactInterest =
  | "buying"
  | "selling"
  | "relocation"
  | "investment"
  | "other";

export interface ContactSubmissionDoc {
  _id: ObjectId;
  name: string;
  email: string;
  phone?: string | null;
  interest: ContactInterest;
  message: string;
  user_agent?: string | null;
  status: "new" | "contacted" | "closed" | "spam";
  created_at: Date;
}

export interface NewsletterSubscriberDoc {
  _id: ObjectId;
  email: string;
  confirmed: boolean;
  source?: string | null;
  created_at: Date;
}
