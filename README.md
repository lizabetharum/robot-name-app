# Robot Team Name Generator

Algebra-powered robot naming app for Velocity Arena. Built for 13-14 year old remedial math students.

## Setup

### 1. Clone and deploy to Vercel

```bash
# Push to GitHub, then import repo at vercel.com/new
# OR use Vercel CLI:
npm i -g vercel
vercel
```

### 2. Add your Anthropic API key

In Vercel dashboard → your project → Settings → Environment Variables:

```
ANTHROPIC_API_KEY = sk-ant-...
```

Set it for **Production**, **Preview**, and **Development**.

Then redeploy: Vercel dashboard → Deployments → Redeploy.

### 3. Local development

```bash
npm i -g vercel
vercel dev
```

This runs both the static frontend and the `/api/validate` serverless function locally.

## How it works

- `public/index.html` — the full app (I Do / We Do / You Do views)
- `api/validate.js` — Edge Function that calls Claude Haiku to check whether a submitted word is a real adjective or animal. The API key never leaves the server.

## Cost

Each word validation call uses ~20 input tokens and 1 output token with Claude Haiku 4.5 ($1/$5 per million tokens). At 100 students adding 5 words each, a full class session costs under $0.01.
