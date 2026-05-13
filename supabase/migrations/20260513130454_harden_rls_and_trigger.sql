-- Address security advisor warnings from the initial schema.
-- Clears all four lints flagged by Supabase's database linter.

-- 1. Make set_updated_at SECURITY INVOKER. It only sets new.updated_at = now();
--    there's no need for elevated privileges. Also revoke EXECUTE from public
--    so it can't be called via /rest/v1/rpc.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from anon, authenticated, public;

-- 2. Tighten contact_submissions INSERT policy with shape constraints. Server-side
--    Zod is already doing the heavy lifting, but the advisor wants RLS not to be
--    trivially true. These bounds match the Zod schema.
drop policy if exists "contact_submissions_insert_public" on public.contact_submissions;
create policy "contact_submissions_insert_public"
on public.contact_submissions for insert
to anon, authenticated
with check (
  length(name) between 2 and 80
  and length(email) between 5 and 200
  and length(message) between 10 and 2000
  and (phone is null or length(phone) <= 40)
  and interest in ('buying', 'selling', 'relocation', 'investment', 'other')
  and status = 'new'  -- inserts can't claim 'contacted' or any other status
);

-- 3. Same for newsletter_subscribers.
drop policy if exists "newsletter_subscribers_insert_public" on public.newsletter_subscribers;
create policy "newsletter_subscribers_insert_public"
on public.newsletter_subscribers for insert
to anon, authenticated
with check (
  length(email) between 5 and 200
  and confirmed = false  -- can't self-confirm
  and (source is null or length(source) <= 40)
);
