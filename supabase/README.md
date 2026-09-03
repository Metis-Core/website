# Supabase — Metis Analytica

## First-time setup

1. Open your Supabase project → **SQL Editor**.
2. Run `migrations/0001_init.sql` (creates tables, triggers, enums, RLS policies).
3. Run `seed.sql` (populates services, products, and open career positions).
4. Create your first user in **Authentication → Users** (or via `/register`).
5. Promote that user to admin:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```

## What's in here

- `migrations/0001_init.sql` — schema for `profiles`, `services`, `products`, `feedback`, `consultations`, `career_positions`, `job_applications`, `contact_messages`, plus enums, triggers, and RLS.
- `seed.sql` — idempotent seed data for services, products, and open career positions. Safe to re-run whenever site content changes.

## RLS summary

| Table              | Public read       | Public insert | User read own | Admin |
|--------------------|-------------------|---------------|---------------|-------|
| profiles           | —                 | via trigger   | ✓             | full  |
| services           | active only       | —             | —             | full  |
| products           | active only       | —             | —             | full  |
| feedback           | —                 | ✓             | ✓             | full  |
| consultations      | —                 | ✓             | ✓             | full  |
| career_positions   | active only       | —             | —             | full  |
| job_applications   | —                 | ✓             | ✓             | full  |
| contact_messages   | —                 | ✓             | ✓             | full  |

Middleware (`middleware.ts` at the repo root) still re-checks auth for `/account` and `/admin`, matching AGENTS.md §2 (middleware is not the authorization boundary — Server Components/Route Handlers re-verify).
