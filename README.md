# PRX Vault – Junior Engineer Technical Challenge
## Password Reset UI + Supabase Edge Function (log-password-reset)

This repository contains my submission for the PRX Vault technical challenge.

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
