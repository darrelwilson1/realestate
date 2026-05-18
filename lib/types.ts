/**
 * Row shapes for the three Supabase tables. Field names are snake_case to match
 * the columns directly so we don't have to remap on every query.
 *
 * NOTE: these MUST be `type` aliases, not `interface`s. Supabase's generated
 * row types are passed to its postgrest-js generics which constrain them to
 * `Record<string, unknown>`; TypeScript interfaces aren't assignable to that
 * because they could be re-opened, so `from('x').insert(...)` ends up typed as
 * `never[]` if you use `interface` here.
 */

export type ListingStatus = "active" | "pending" | "sold" | "off_market";

export type ListingRow = {
  id: string;
  slug: string;
  title: string;
  status: ListingStatus;
  price_cents: number;
  address_street: string;
  address_city: string;
  address_region: string;
  address_postal_code: string | null;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number | null;
  lot_sqft: number | null;
  year_built: number | null;
  description: string;
  hero_image: string | null;
  images: string[];
  features: string[];
  is_featured: boolean;
  listed_at: string;
  created_at: string;
  updated_at: string;
};

export type ListingInsert = Omit<ListingRow, "id" | "created_at" | "updated_at">;

export type ContactInterest =
  | "buying"
  | "selling"
  | "relocation"
  | "investment"
  | "other";

export type ContactStatus = "new" | "contacted" | "closed" | "spam";

export type ContactSubmissionRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest: ContactInterest;
  message: string;
  user_agent: string | null;
  status: ContactStatus;
  created_at: string;
};

export type ContactSubmissionInsert = Omit<
  ContactSubmissionRow,
  "id" | "status" | "created_at"
> & {
  status?: ContactStatus;
};

export type NewsletterSubscriberRow = {
  id: string;
  email: string;
  confirmed: boolean;
  source: string | null;
  created_at: string;
};

export type NewsletterSubscriberInsert = Omit<
  NewsletterSubscriberRow,
  "id" | "confirmed" | "created_at"
> & {
  confirmed?: boolean;
};

/**
 * Database schema shape consumed by @supabase/ssr's createClient<Database>().
 * Keep in sync with supabase/migrations/0001_init.sql.
 */
export type Database = {
  public: {
    Tables: {
      listings: {
        Row: ListingRow;
        Insert: ListingInsert;
        Update: Partial<ListingInsert>;
        Relationships: [];
      };
      contact_submissions: {
        Row: ContactSubmissionRow;
        Insert: ContactSubmissionInsert;
        Update: Partial<ContactSubmissionInsert>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriberRow;
        Insert: NewsletterSubscriberInsert;
        Update: Partial<NewsletterSubscriberInsert>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
  };
};
