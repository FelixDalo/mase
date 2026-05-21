# Speed-to-Lead Email System — Reusable Template

A plug-in system for any client website that:
1. Sends the business an instant notification when someone fills the contact form
2. Sends the enquirer an immediate auto-reply so they know their message was received

Built on Resend (3,000 free emails/month per account). No backend framework needed — just PHP on shared hosting (Hostinger, cPanel, etc.).

---

## How it works

```
User submits contact form
        ↓
React/HTML form POSTs JSON to /api/submit.php
        ↓
PHP reads config.php for client-specific details
        ↓
PHP calls Resend API twice:
  1. Notification email → client's business inbox
  2. Auto-reply email   → person who submitted the form
```

---

## File structure

```
public/
  api/
    submit.php          ← generic engine, never changes between clients
    config.php          ← client-specific values (gitignored, lives on server only)
    config.example.php  ← committed to git, used as the setup template
```

---

## config.php — all client-specific values

```php
<?php
define('RESEND_API_KEY',     're_your_api_key_here');
define('BUSINESS_NAME',      'Client Business Name');
define('BUSINESS_EMAIL',     'info@clientdomain.com');
define('BUSINESS_WEBSITE',   'clientdomain.com');
define('AUTOREPLY_SUBJECT',  'Thank you for your enquiry — Client Business Name');
define('AUTOREPLY_GREETING', 'Thank you for reaching out to Client Business Name.');
define('AUTOREPLY_BODY',     'We have received your enquiry and a member of our team will be in touch with you shortly. We look forward to the conversation.');
define('AUTOREPLY_SIGN_OFF', 'The Client Business Name Team');
```

---

## submit.php — generic engine

The file reads all business details from `config.php` constants. It:
- Accepts a JSON POST from the form with fields: `name`, `email`, `organisation`, `phone`, `area_of_interest`, `message`
- Validates that `name` and `email` are present
- Sends notification email to `BUSINESS_EMAIL` with all submitted fields formatted cleanly
- Sets `reply_to` on the notification to the submitter's email so the team can reply directly
- Sends auto-reply to the submitter using `AUTOREPLY_*` constants for the message content
- Returns `{ "success": true }` or `{ "success": false, "message": "..." }` as JSON

No client details are hardcoded anywhere in `submit.php`. Copying it to a new project requires zero edits.

---

## React/frontend form

The form POSTs to `/api/submit.php` with `Content-Type: application/json`. Fields:

```json
{
  "name": "...",
  "organisation": "...",
  "email": "...",
  "phone": "...",
  "area_of_interest": "...",
  "message": "..."
}
```

The form should handle three states: `idle`, `loading`, `success`, `error`.

On success show: *"Thank you for reaching out. We've received your enquiry and will be in touch shortly."*
On error show: *"Something went wrong. Please email us directly at [BUSINESS_EMAIL]."*

---

## Setup steps for each new client

### Step 1 — Resend account
- Client creates a free account at resend.com (or you create one on their behalf)
- Each client needs their own account — Resend ties verified domains to the account

### Step 2 — Verify the domain
- In Resend dashboard → Domains → Add the client's domain (e.g. `clientdomain.com`)
- Resend provides 3 DNS records (usually 1 x MX, 1 x TXT, 1 x DKIM)
- Add these in the client's DNS zone (Hostinger, GoDaddy, Namecheap, Cloudflare, etc.)
- Verification usually completes within 5–30 minutes
- Without this step, emails either fail or land in spam

### Step 3 — Create API key
- Resend dashboard → API Keys → Create key → copy it
- Scope: sending access only (no need for full access)

### Step 4 — Create config.php on the server
- In Hostinger File Manager, navigate to `public_html/api/`
- Create `config.php` (copy from `config.example.php`)
- Paste the API key and fill in all business details
- Save — this file never gets committed to git

### Step 5 — Build and deploy
- Run `npm run build`
- Upload `dist/` contents to `public_html/` on Hostinger
- The `api/` folder inside `dist/` contains `submit.php` and `config.example.php`
- Verify `config.php` is already on the server from Step 4

### Step 6 — Test
- Submit a test enquiry through the live form
- Confirm the business inbox receives the notification
- Confirm the test email address receives the auto-reply
- Check spam folder if either email doesn't arrive within 2 minutes

---

## .gitignore rule to add to every project

```
public/api/config.php
```

This ensures the real API key and client details never get pushed to any repository.

---

## Notes

- Resend free tier: 3,000 emails/month. Each form submission uses 2 emails (notification + auto-reply). That covers ~1,500 form submissions/month before hitting the limit.
- If a client's volume exceeds this, Resend paid starts at $20/month for 50,000 emails.
- The `.htaccess` file used for React SPA routing already handles PHP correctly — the `RewriteCond %{REQUEST_FILENAME} !-f` rule means existing PHP files are never redirected to `index.html`.
- PHP's `curl` must be enabled on the server (it is on all standard Hostinger plans).
