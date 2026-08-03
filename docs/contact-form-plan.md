# Contact form — analysis & options

**Question:** can `https://www.workshops-ai.eu/#contact` just hardcode an email address, or does it need a backend?

**Short answer:** it needs neither a hardcoded `mailto:` nor a backend of your own. Use a hosted form endpoint. But there is a more urgent problem first — see Finding 1.

---

## 1. What exists today

`src/components/Contact.jsx` renders a six-field form. On submit (`Contact.jsx:25-41`) it does **not** send anything. It assembles a `mailto:` URL and sets `window.location.href`, handing the visitor off to whatever mail client their OS has registered.

```js
const CONTACT_EMAIL = 'hello@ai-workshops.example'   // line 4
```

### Finding 1 — the form is dead right now (critical)

`.example` is a reserved TLD (RFC 2606). It cannot receive mail and never will. Every enquiry submitted since launch has either opened an empty draft to an unroutable address or done nothing at all. **No lead has reached you through this page.** Whatever else is decided below, this line needs a real address today.

### Finding 2 — production is serving the Vite dev server (high)

The live HTML at `https://www.workshops-ai.eu/` contains:

```html
<script type="module" src="/@vite/client"></script>
```

`package.json:start` is `vite --host 0.0.0.0 --port 8080`, and DigitalOcean App Platform is running it as a long-lived web service. Consequences: unminified source shipped to every visitor, a hot-reload websocket attempting to connect from the browser, no asset hashing or compression, and a dev server exposed to the public internet. It also explains the `allowedHosts` entries in `vite.config.js` and the recent run of "vite update / pk update" commits.

This matters to the decision below because it tells us **the site is already a Node service, not static hosting.** A backend is infrastructurally cheap here — you're paying for the container regardless.

### Context that shapes the choice

| Factor | Reading |
|---|---|
| Audience | Factory / industrial staff on managed corporate laptops |
| Mail clients | Mixed: Outlook desktop (mailto works) and OWA/Citrix/Chromebook (mailto silently fails) |
| Expected volume | Low — a new B2B consulting site, plausibly 0–30 enquiries/month |
| Operator | Solo; no appetite for running infrastructure |
| Hosting | DigitalOcean App Platform (Node service) behind Cloudflare |
| Jurisdiction | `.eu` domain, EU factories → GDPR applies to the lead data |
| Value per lead | High — one converted lead is a multi-workshop program |

That last row is the one that settles it. With low volume and high value per lead, **silent submission failure is the dominant risk.** Optimise for "no enquiry is ever lost", not for cost or elegance.

---

## 2. Options

### Option A — Hardcode a real address, keep `mailto:`

Change line 4 to a working address. Five minutes, zero dependencies.

**Pros** — no third party, no processor agreement, nothing to maintain, no running costs.

**Cons** — the deal-breaker is silent loss: a visitor with no registered mail handler clicks *Request the free session* and nothing visible happens. They assume it sent. You never learn they existed. On corporate/webmail setups this is a large minority of your exact audience. Beyond that: no record on your side unless they actually press Send, a plain address in the JS bundle gets harvested by scrapers, no spam filtering, and no way to measure conversion.

**Verdict** — necessary as a *fallback*, not sufficient as the primary path.

### Option B — Hosted form endpoint ✅ recommended

A `fetch()` POST to a third-party endpoint that emails you the submission. Site stays as-is architecturally; no server code.

| Vendor | Free tier | Notes |
|---|---|---|
| **Formspree** | 50/mo | Most polished; submission dashboard, spam filtering, DPA available. EU data region on paid tiers. |
| **Web3Forms** | 250/mo | Simplest — an access key, no account required to start. Verify EU/DPA posture before committing. |
| **Basin** | 100/mo | Good spam handling, EU-friendly. |

**Pros** — works on every device and mail setup; you get a stored copy independent of the visitor's mail client; real submit/success/error UI becomes possible; spam filtering included; your address never appears in the bundle; ~1–2 hours of work.

**Cons** — a third-party data processor handling EU personal data, so you need their DPA and ideally EU-region storage; free tier caps (comfortably above your expected volume); the endpoint key sits in client JS, which is by design but means you rely on their rate limiting.

**Verdict** — the right fit. Correct effort-to-reliability ratio for this site's stage.

### Option C — Own endpoint on the existing DigitalOcean service

Add `POST /api/contact` to a small Express server that also serves the built `dist/`.

**Pros** — data stays in your stack, EU region already selectable, no per-submission limits, room for later logic (CRM push, Slack ping, autoresponder). Forces the fix for Finding 2 in the same change, which is needed anyway.

**Cons** — this does **not** actually remove the third party. Sending SMTP directly from a cloud container has poor deliverability and commonly blocked ports, so you'd still sign up for Resend / Postmark / Brevo. So you take on secrets management, spam defence, error handling and maintenance *and* keep a vendor. Roughly 3–5 hours.

**Verdict** — reasonable later if a client's procurement demands data residency. Not justified today.

### Option D — Cloudflare Pages Function / Worker

Cloudflare already fronts the domain. A Worker proxying to an email API, paired with Turnstile (their free CAPTCHA).

**Pros** — generous free tier, EU edge, no servers, best-in-class bot protection.

**Cons** — splits deployment across two platforms for one form. Same "still need an email API" caveat as C.

**Verdict** — a good version of Option C if you ever outgrow B. Not a starting point.

### Option E — Booking widget instead of a form

Your CTA is *"One call. Two free workshops."* — an appointment, not an enquiry. Cal.com (free, EU-hosted option, GDPR-friendly) or Calendly would give you a confirmed calendar event with their details attached, skipping the email round-trip entirely.

**Pros** — higher conversion for a "book a call" ask; removes email delivery from the critical path; both parties get a calendar invite and reminders.

**Cons** — some buyers won't put a slot in the diary before any contact, and a booking embed can't carry the "which documents cause the most pain?" context that makes your first call useful.

**Verdict** — a strong *addition*, not a replacement. Worth revisiting once B is live.

---

## 3. Recommendation

**Option B, with the `mailto:` retained as a visible fallback.**

Rationale: it eliminates the silent-failure mode that Option A cannot, at a fraction of the effort and maintenance of C or D. Volume is far below any free tier. If data residency ever becomes a procurement question, migrating B → C is a contained change to one submit handler.

### On the specific address

You asked about `cristi.corneanu1@gmail.com`. It will work, but don't publish it. Create `contact@workshops-ai.eu` and forward it to that Gmail:

- costs nothing extra with most registrars (or use Cloudflare Email Routing, free, since Cloudflare already has the domain)
- matches the site a prospect is standing on — a Gmail address on a page selling AI consulting to manufacturers reads as improvised
- if it gets scraped and spammed, you delete the alias; your personal inbox is untouched
- you can hand it to a collaborator later without sharing a personal account

---

## 4. Implementation plan (Option B)

**Step 1 — Unblock delivery (today, ~15 min).**
Set up `contact@workshops-ai.eu` → forwarding. Replace `CONTACT_EMAIL` in `Contact.jsx:4`. The form is then at least as good as Option A while the rest is built. Send a test enquiry and confirm arrival.

**Step 2 — Choose and configure the vendor (~20 min).**
Create the endpoint. Confirm the DPA and where submissions are stored — this is EU personal data. Point delivery notifications at the new alias.

**Step 3 — Rework the submit handler (~1 h).**
Replace `Contact.jsx:25-41` with an async POST. Add `status` state (`idle | sending | ok | error`), disable the button while sending, render an inline success panel replacing the form, and on failure show an error that still offers the `mailto:` path so the enquiry is never trapped. Keep the existing field names — they map cleanly to the email body already being built.

**Step 4 — Spam defence (~30 min).**
A honeypot input (hidden field; bots fill it, humans don't — reject on the client before POST). If junk still gets through, add Cloudflare Turnstile, which is free and invisible to most users.

**Step 5 — Privacy note (~20 min).**
A line under the submit button stating what you collect, that it's used only to respond to the enquiry, and who processes it — linked to a short privacy page. Expected for an EU B2B lead form and currently absent from the site.

**Step 6 — Verify (~15 min).**
Test the happy path, a forced network failure, and a honeypot trip. Check the delivered email is readable and that reply-to is the *visitor's* address, not yours — otherwise replying goes to the wrong place.

Total: half a day, most of it in Steps 3–4.

### Sketch

```jsx
const [status, setStatus] = useState('idle')

const onSubmit = async (e) => {
  e.preventDefault()
  if (form.website) return          // honeypot tripped — silently drop
  setStatus('sending')
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...form, _replyto: form.email }),
    })
    setStatus(res.ok ? 'ok' : 'error')
  } catch {
    setStatus('error')              // error branch keeps the mailto: escape hatch
  }
}
```

---

## 5. Adjacent issues found

Not part of this task — listed because they surfaced while tracing the form, and because two of them cost you money or leads right now.

1. **Production runs the Vite dev server** (Finding 2). Fix: `"start": "vite preview"` at minimum, or serve `dist/` from a static server. Directly affects page speed, and therefore this form's conversion rate.
2. **Placeholder SEO metadata** — `index.html:19` and `:22` both point at `https://example.com/`. Wrong canonical URL suppresses search indexing; wrong `og:url` breaks link previews when anyone shares the site.
3. **`node_modules/` is committed** — 2,312 of 2,372 tracked files, and there is no `.gitignore`.
4. **A GitHub personal access token is embedded in the `origin` remote URL** in `.git/config`. It isn't in tracked files, so it hasn't leaked publicly, but it's stored in plaintext and was visible in tooling output. Worth rotating and switching to a credential helper or SSH.
