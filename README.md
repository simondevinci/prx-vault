# PRX Vault – Technical Challenge (Password Reset + Supabase Edge Function)

This repo contains my submission for the PRX Vault Junior–Mid Software Engineer technical challenge.

## What I built

### 1) Password Reset UI (Next.js App Router + Tailwind)
A reset password page with:
- Password + confirm password fields
- Validation rules (min length, uppercase, number, special character)
- Inline error messages
- Password strength indicator (Weak/Medium/Strong)
- Success state with auto-redirect to `/auth/login`

Route:
- `/auth/reset-password`

### 2) Supabase Edge Function – `log-password-reset`
An Edge Function that receives a JSON payload and logs it to the console, returning a JSON response.

Endpoint (local):
- `http://127.0.0.1:54321/functions/v1/log-password-reset`

Expected payload:
```json
{
  "email": "user@example.com",
  "resetTime": "2025-12-30T09:45:33.051Z"
}


