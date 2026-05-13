-- Darrel's Real Estate — initial schema.
-- Three tables: listings (public-read), contact_submissions (insert-only public),
-- newsletter_subscribers (insert-only public). RLS protects everything else.

-- =========================================================
-- listings: properties Darrel is currently representing.
-- =========================================================
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null default 'active'
    check (status in ('active', 'pending', 'sold', 'off_market')),
  price_cents bigint not null check (price_cents >= 0),
  address_street text not null,
  address_city text not null default 'Las Vegas',
  address_region text not null default 'NV',
  address_postal_code text,
  neighborhood text not null,
  beds smallint not null check (beds >= 0),
  baths numeric(3,1) not null check (baths >= 0),
  sqft integer check (sqft >= 0),
  lot_sqft integer check (lot_sqft >= 0),
  year_built smallint,
  description text not null default '',
  hero_image text,
  images jsonb not null default '[]'::jsonb,
  features text[] not null default '{}',
  is_featured boolean not null default false,
  listed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index listings_status_listed_at_idx on public.listings (status, listed_at desc);
create index listings_neighborhood_idx on public.listings (neighborhood);
create index listings_is_featured_idx on public.listings (is_featured) where is_featured;

comment on table public.listings is 'Luxury property listings represented by Darrel''s Real Estate.';
comment on column public.listings.status is 'active = on market, pending = under contract, sold, off_market = withdrawn/private.';
comment on column public.listings.price_cents is 'Price in cents to avoid float-precision issues.';

-- =========================================================
-- contact_submissions: leads from the /contact form.
-- =========================================================
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  interest text not null
    check (interest in ('buying', 'selling', 'relocation', 'investment', 'other')),
  message text not null,
  user_agent text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed', 'spam')),
  created_at timestamptz not null default now()
);

create index contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
create index contact_submissions_status_idx on public.contact_submissions (status) where status = 'new';

comment on table public.contact_submissions is 'Inbound inquiries from the public /contact form.';

-- =========================================================
-- newsletter_subscribers: footer signup email captures.
-- =========================================================
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  confirmed boolean not null default false,
  source text default 'footer',
  created_at timestamptz not null default now()
);

comment on table public.newsletter_subscribers is 'Quarterly market-intel newsletter list (double-opt-in pending).';

-- =========================================================
-- updated_at trigger — keep listings.updated_at fresh on UPDATE.
-- =========================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger listings_set_updated_at
before update on public.listings
for each row execute function public.set_updated_at();

-- =========================================================
-- Row-Level Security
-- =========================================================
alter table public.listings enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- listings: anyone (anon + authed) can read ACTIVE listings.
-- Writes go through service-role (which bypasses RLS).
create policy "listings_select_active_public"
on public.listings for select
to anon, authenticated
using (status = 'active');

-- contact_submissions: anyone can INSERT. No one can read/update/delete via the API.
-- The Next /api/contact route already Zod-validates before insert.
create policy "contact_submissions_insert_public"
on public.contact_submissions for insert
to anon, authenticated
with check (true);

-- newsletter_subscribers: anyone can INSERT. No one can read/update/delete.
create policy "newsletter_subscribers_insert_public"
on public.newsletter_subscribers for insert
to anon, authenticated
with check (true);
