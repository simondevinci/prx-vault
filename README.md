# PRX Vault – Junior Engineer Technical Challenge
## Password Reset UI + Supabase Edge Function (log-password-reset)
---

## Overview

### Part 1 — Password Reset UI (Next.js + Tailwind)
Implemented a password reset page using Next.js App Router with:
- New password + confirm password fields
- Validation rules via **Zod**:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character
  - Confirm password must match
- Inline error messages
- Simple password strength indicator (Weak / Medium / Strong)
- On success: shows a success message and redirects to `/auth/login`

Route:
- `http://localhost:3000/auth/reset-password`

### Part 2 — Supabase Edge Function (`log-password-reset`)
Created and served a Supabase Edge Function that:
- Accepts a JSON payload `{ email, resetTime }`
- Logs the event to the console
- Returns `{ status: "logged" }`

Local endpoint:
- `http://127.0.0.1:54321/functions/v1/log-password-reset`

Expected payload:
```json
{
  "email": "user@example.com",
  "resetTime": "2025-12-30T09:45:33.051Z"
}

How to Run (Step-by-step)

Prerequisites
- Node.js installed
- Docker Desktop installed and running
- Supabase CLI installed

1) Install dependencies

From the project root:
npm install

2) Start Supabase locally

In Terminal 1:
supabase start

Expected output includes:
Project URL: http://127.0.0.1:54321
Edge Functions base URL: http://127.0.0.1:54321/functions/v1

3) Serve the Edge Function

In Terminal 2:
supabase functions serve


Expected output includes:
http://127.0.0.1:54321/functions/v1/log-password-reset

4) Configure environment variables

Create a .env.local in the project root:
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable key from supabase start output>

Note: This file is intentionally not committed.

5) Run the Next.js app

In Terminal 3:
npm run dev


Open:
http://localhost:3000/auth/reset-password

6) Verify the full flow

- Open the reset password page

- Enter a valid password + confirm

- Submit

- Expected results:

- UI shows success + redirects to /auth/login

- Terminal 2 (supabase functions serve) prints a log like:

- Password reset event logged: { email: "user@example.com", resetTime: "..." }
