-- Darrel's Real Estate — initial schema
--
-- Run this in: Supabase dashboard → SQL editor → paste → Run.
-- Or via the CLI:  supabase db push
--
-- Creates three tables:
--   listings                — public-readable, used for /listings and /listings/[slug]
--   contact_submissions     — write-only from the public role (form posts), read by admins
--   newsletter_subscribers  — write-only from the public role, read by admins
--
-- RLS policies allow:
--   - anonymous SELECT on active listings
--   - anonymous INSERT on contact_submissions and newsletter_subscribers
--   - no anonymous SELECT on submissions/subscribers (avoid leaking PII)
--
-- The publishable (anon) key is what NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ships
-- to the browser. Everything below is what that key is allowed to do.

-- =============================================================================
-- Enums
-- =============================================================================

create type listing_status as enum ('active', 'pending', 'sold', 'off_market');
create type contact_interest as enum ('buying', 'selling', 'relocation', 'investment', 'other');
create type contact_status as enum ('new', 'contacted', 'closed', 'spam');

-- =============================================================================
-- listings
-- =============================================================================

create table listings (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  status              listing_status not null default 'active',
  price_cents         bigint not null check (price_cents >= 0),
  address_street      text not null,
  address_city        text not null,
  address_region      text not null,
  address_postal_code text,
  neighborhood        text not null,
  beds                numeric not null check (beds >= 0),
  baths               numeric not null check (baths >= 0),
  sqft                integer check (sqft is null or sqft >= 0),
  lot_sqft            integer check (lot_sqft is null or lot_sqft >= 0),
  year_built          integer check (year_built is null or year_built between 1800 and 2100),
  description         text not null,
  hero_image          text,
  images              text[] not null default '{}',
  features            text[] not null default '{}',
  is_featured         boolean not null default false,
  listed_at           timestamptz not null default now(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index listings_status_listed_at_idx
  on listings (status, listed_at desc);
create index listings_featured_idx
  on listings (is_featured)
  where is_featured = true;

-- Keep updated_at fresh on every UPDATE.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger listings_set_updated_at
  before update on listings
  for each row execute function set_updated_at();

-- =============================================================================
-- contact_submissions
-- =============================================================================

create table contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  interest    contact_interest not null,
  message     text not null,
  user_agent  text,
  status      contact_status not null default 'new',
  created_at  timestamptz not null default now()
);

create index contact_submissions_created_at_idx
  on contact_submissions (created_at desc);

-- =============================================================================
-- newsletter_subscribers
-- =============================================================================

create table newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  confirmed   boolean not null default false,
  source      text,
  created_at  timestamptz not null default now()
);

-- =============================================================================
-- Row Level Security
-- =============================================================================

alter table listings                enable row level security;
alter table contact_submissions     enable row level security;
alter table newsletter_subscribers  enable row level security;

-- Anyone can read active listings. (Sold/pending stay hidden from the public.)
create policy "listings public read active"
  on listings
  for select
  to anon, authenticated
  using (status = 'active');

-- Anyone can submit the contact form. Nobody public can read it back.
create policy "contact submissions public insert"
  on contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Anyone can subscribe to the newsletter. Nobody public can read it back.
create policy "newsletter subscribers public insert"
  on newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);
