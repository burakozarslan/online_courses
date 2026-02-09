# Deployment Guide: Vercel + Neon Database

This guide walks you through deploying the Online Courses platform to Vercel with a production Neon PostgreSQL database.

## Quick Overview

```
Local Development -> GitHub -> Vercel -> Neon Database
                                 |
                                 v
                            Stripe Webhooks
```

## Prerequisites

- GitHub account with this repository pushed
- Vercel account (sign up at https://vercel.com)
- Neon account (sign up at https://neon.tech)
- Stripe account with API keys
- Local terminal access

---

## Step 1: Create Neon Database

### 1.1 Sign Up for Neon

1. Go to https://neon.tech
2. Sign up with GitHub (recommended) or email
3. Verify your email if required

### 1.2 Create Production Database

1. Click "Create Project" or "New Project"
2. Project settings:
   - **Name**: `online-courses-prod`
   - **Region**: Choose closest to your users (e.g., US East, EU West, Asia Pacific)
   - **PostgreSQL Version**: Latest (default)
3. Click "Create Project"
4. Neon creates a default database called `neondb`

### 1.3 Get Connection String

1. In your project dashboard, find the **Connection Details** section
2. You'll see two connection strings:
   - **Direct connection** (for migrations)
   - **Pooled connection** (for Vercel - recommended)
3. Copy the **Pooled connection string** - it looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
   ```
4. Save this securely - you'll need it for Vercel

> **Note**: The free tier includes 0.5 GB storage and 10 GB data transfer/month, sufficient for most projects.

---

## Step 2: Prepare Your Repository

### 2.1 Verify Environment Files

Check that sensitive files are gitignored:

```bash
# Should already be in .gitignore:
.env*
!.env.example
```

### 2.2 Push to GitHub

If you haven't already:

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your repository: `online_courses`
5. Vercel auto-detects Next.js

### 3.2 Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.3 Add Environment Variables

Click "Environment Variables" and add these:

| Variable | Value | Where to Get It |
|----------|-------|-----------------|
| `DATABASE_URL` | Your Neon pooled connection string | From Neon dashboard (Step 1.3) |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` | Run in terminal |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe Dashboard → Developers → API Keys (use **Live** mode) |
| `NEXT_PUBLIC_BASE_URL` | `https://your-app.vercel.app` | Use temporary Vercel domain first |
| `NODE_ENV` | `production` | Type manually |

> **Important**: Don't add `STRIPE_WEBHOOK_SECRET` yet - we'll do this after first deployment.

Apply to: **Production**, **Preview**, and **Development** (or just Production for now)

### 3.4 Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Note your deployment URL: `https://your-app-xxx.vercel.app`

---

## Step 4: Run Database Migrations

After your first deployment succeeds, initialize the production database.

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Link to your Vercel project
vercel link

# Pull production environment variables
vercel env pull .env.production

# Run migrations using production DATABASE_URL
npx prisma migrate deploy
```

### Option B: Manual with Production Connection String

```bash
# Set production DATABASE_URL temporarily
export DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"

# Run migrations
npx prisma migrate deploy

# Unset to avoid accidents
unset DATABASE_URL
```

> **Verify**: Check Neon dashboard - you should see tables created.

---

## Step 5: Seed Production Database

### 5.1 Set Seed Credentials

**IMPORTANT**: Use strong, unique credentials - NOT the development defaults!

```bash
# Generate a strong password (save this securely!)
openssl rand -base64 32

# Set your production seed credentials
export SEED_INSTRUCTOR_EMAIL="admin@yourdomain.com"
export SEED_INSTRUCTOR_PASSWORD="<paste-the-strong-password-here>"
export NODE_ENV="production"
export DATABASE_URL="<your-neon-connection-string>"
```

### 5.2 Run Seed Script

```bash
npm run db:seed
```

Expected output:
```
🌱 Starting seed...
🔒 Running in PRODUCTION mode with secure credentials
🧹 Cleaning database...
🧹 DB Cleaned.
✅ Instructor created: admin@yourdomain.com
⏭️  Skipping test student creation in production
📚 20 Courses created.
✅ Seed complete.
```

### 5.3 Save Your Credentials

**Critical**: Store these credentials securely:
- Use a password manager (1Password, LastPass, Bitwarden)
- Document: Production admin email and password
- You'll need these to log into your production site

```bash
# Clean up environment variables
unset SEED_INSTRUCTOR_EMAIL
unset SEED_INSTRUCTOR_PASSWORD
unset DATABASE_URL
unset NODE_ENV
```

---

## Step 6: Configure Stripe Webhooks

### 6.1 Create Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-app.vercel.app/api/webhooks/stripe`
4. Description: "Vercel Production Webhook"
5. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click "Add endpoint"

### 6.2 Get Webhook Secret

1. Click on your newly created endpoint
2. Under "Signing secret", click "Reveal"
3. Copy the secret (starts with `whsec_...`)

### 6.3 Add to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_...` (paste your webhook secret)
   - **Environment**: Production
3. Save

### 6.4 Redeploy

Vercel should automatically redeploy when you add environment variables. If not:

1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment

---

## Step 7: Update Base URL

Now that you know your final domain:

### 7.1 If Using Vercel Domain

1. Go to Vercel → Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_BASE_URL` to your actual URL:
   ```
   https://your-app-xxx.vercel.app
   ```
3. Redeploy

### 7.2 If Using Custom Domain

1. Go to Vercel → Project Settings → Domains
2. Add your custom domain (e.g., `courses.yourdomain.com`)
3. Configure DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to:
   ```
   https://courses.yourdomain.com
   ```
5. Update Stripe webhook URL to match new domain
6. Redeploy

---

## Step 8: Verify Deployment

### 8.1 Basic Checks

1. Visit your production URL
2. Verify homepage loads correctly
3. Check navigation works
4. Verify course listings display

### 8.2 Test User Registration

1. Click "Register" or "Sign Up"
2. Create a new test account:
   - Email: `test@yourpersonalemail.com`
   - Password: something secure
3. Verify you can register successfully
4. Check email confirmation (if implemented)

### 8.3 Test Admin Login

1. Go to login page
2. Use your production admin credentials:
   - Email: from `SEED_INSTRUCTOR_EMAIL`
   - Password: from `SEED_INSTRUCTOR_PASSWORD`
3. Verify you can access admin/instructor features

### 8.4 Test Database Connection

1. Check Vercel deployment logs:
   - Go to Vercel → Deployments → Latest → Runtime Logs
2. Look for database connection messages
3. Should see successful Prisma connections

### 8.5 Test Free Course Access

1. Login as a regular user (not admin)
2. Browse free courses
3. Enroll in a free course
4. Verify video playback works
5. Test progress tracking

### 8.6 Test Stripe Integration

1. Browse paid courses
2. Click "Upgrade to Pro" or "Enroll" on paid course
3. Verify redirect to Stripe Checkout
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete checkout
6. Verify:
   - Redirect back to site
   - Subscription activated
   - Can access paid content

### 8.7 Check Webhook Delivery

1. After test purchase, go to Stripe Dashboard → Webhooks
2. Click your webhook endpoint
3. Check "Recent deliveries" - should show successful events
4. Status should be 200 OK (green checkmark)

---

## Troubleshooting

### Build Fails with "Prisma Client not found"

**Solution**: Update Vercel build command:

```bash
npx prisma generate && npm run build
```

### Database Connection Timeout

**Possible causes**:
1. Wrong connection string format
2. Not using pooled connection from Neon
3. Missing `?sslmode=require` in connection string

**Solution**: Verify your `DATABASE_URL` in Vercel matches exactly:
```
postgresql://user:pass@host/db?sslmode=require&pgbouncer=true
```

### Stripe Webhook Returns 401/403

**Possible causes**:
1. Wrong webhook secret in Vercel
2. Environment variable not applied

**Solution**:
1. Verify `STRIPE_WEBHOOK_SECRET` in Vercel matches Stripe dashboard
2. Redeploy after adding the variable
3. Check webhook endpoint URL is exactly correct

### "NEXTAUTH_SECRET must be provided"

**Solution**: 
1. Generate a new secret: `openssl rand -base64 32`
2. Add to Vercel environment variables
3. Redeploy

### Seed Script Fails in Production

**Error**: "Production mode requires SEED_INSTRUCTOR_EMAIL..."

**Solution**: You must set these variables before running seed:
```bash
export SEED_INSTRUCTOR_EMAIL="admin@yourdomain.com"
export SEED_INSTRUCTOR_PASSWORD="your-strong-password"
export NODE_ENV="production"
```

---

## Post-Deployment Checklist

- [ ] Neon database created and connection string saved
- [ ] Vercel project deployed successfully
- [ ] All environment variables configured in Vercel
- [ ] Database migrations run successfully
- [ ] Production database seeded with secure credentials
- [ ] Admin credentials saved in password manager
- [ ] Stripe webhook endpoint configured and tested
- [ ] Production URL updated in environment variables
- [ ] User registration tested
- [ ] Admin login tested
- [ ] Free course enrollment tested
- [ ] Stripe checkout tested (test mode first!)
- [ ] Webhook events verified in Stripe dashboard

---

## Going Live with Real Payments

When you're ready to accept real payments:

1. **Switch Stripe to Live Mode**:
   - Stripe Dashboard → Toggle "Test mode" to OFF
   - Get new live API keys from Developers → API Keys
   - Update `STRIPE_SECRET_KEY` in Vercel with live key (`sk_live_...`)

2. **Create New Live Webhook**:
   - Stripe Dashboard (Live mode) → Developers → Webhooks
   - Add endpoint with same URL and events
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel with new live secret

3. **Test with Real Card** (use a low-value test):
   - Create a test account
   - Purchase with real card for $1 or minimum
   - Verify full flow works
   - Cancel subscription immediately if just testing

4. **Monitor**:
   - Check Stripe Dashboard regularly
   - Monitor Vercel logs for errors
   - Check Neon database metrics

---

## Ongoing Maintenance

### Database Backups

Neon provides automatic backups. To manually backup:
1. Neon Dashboard → Your Project → Backups
2. Click "Create Backup" for important milestones

### Monitoring

**Vercel**:
- Check deployment logs regularly
- Set up Vercel Analytics for traffic insights

**Neon**:
- Monitor database size (free tier: 0.5 GB)
- Check connection count
- Review query performance

**Stripe**:
- Monitor failed payments
- Check webhook delivery success rate
- Review subscription metrics

### Schema Changes

When you modify the Prisma schema:

```bash
# 1. Create migration locally
npx prisma migrate dev --name your_migration_name

# 2. Test locally
npm run dev

# 3. Commit and push
git add prisma/migrations
git commit -m "Add migration: your_migration_name"
git push

# 4. Deploy migrations to production
export DATABASE_URL="<neon-connection-string>"
npx prisma migrate deploy
```

Vercel will auto-deploy code changes, but you must manually run migrations.

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## Security Best Practices

1. **Never commit secrets** to git - use `.env` files (already gitignored)
2. **Use strong passwords** for production admin account
3. **Rotate secrets** periodically (NEXTAUTH_SECRET, database password)
4. **Enable 2FA** on Vercel, GitHub, Stripe, and Neon accounts
5. **Monitor logs** for suspicious activity
6. **Use HTTPS only** (Vercel provides this automatically)
7. **Keep dependencies updated**: Run `npm audit` regularly

---

## Cost Summary

- **Vercel**: Free tier (sufficient for hobby projects)
  - Upgrade to Pro ($20/mo) for better performance and more team features
- **Neon**: Free tier (0.5 GB storage, 10 GB transfer/month)
  - Paid plans start at $19/mo for more storage
- **Stripe**: No monthly fee
  - 2.9% + $0.30 per successful charge
  - No charge for failed transactions

---

**Congratulations!** Your app is now live in production! 🎉
