# Pre-Deployment Checklist

Before deploying to production, ensure all these items are completed to avoid issues and ensure a smooth deployment.

## 📋 Repository & Code

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] E2E tests passing (`npm run test:e2e`)
- [ ] No linter errors (`npm run lint`)
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Development build works (`npm run build`)

### Git & Version Control
- [ ] All changes committed to git
- [ ] Code pushed to GitHub/GitLab
- [ ] Working on main/master branch (or appropriate production branch)
- [ ] `.gitignore` properly configured (includes `.env*`, excludes `.env.example`)
- [ ] No sensitive data in commit history

### Environment Files
- [ ] `.env.example` created with all required variables (without values)
- [ ] Local `.env` or `.env.local` has all development variables
- [ ] No production credentials in local `.env` files
- [ ] Production credentials stored securely (password manager)

## 🗄️ Database Preparation

### Local Database
- [ ] Local database schema is up to date
- [ ] All migrations created and tested locally
- [ ] Seed script runs successfully in development
- [ ] Migration files committed to repository

### Production Database
- [ ] Neon account created
- [ ] Production database project created
- [ ] Connection string (pooled) copied and saved securely
- [ ] Connection string tested locally (optional but recommended)

### Prisma Configuration
- [ ] `prisma/schema.prisma` has correct `datasource db` config
- [ ] Prisma Client generation works (`npx prisma generate`)
- [ ] Binary targets include `linux-musl-openssl-3.0.x` for Vercel

```prisma
generator client {
  provider      = "prisma-client"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
  output        = "../app/generated/prisma"
}
```

## 🔐 Authentication & Security

### NextAuth Configuration
- [ ] `NEXTAUTH_SECRET` generated for production (`openssl rand -base64 32`)
- [ ] `NEXTAUTH_SECRET` saved securely (different from development)
- [ ] Auth configuration tested locally
- [ ] Session strategy configured (JWT or database)

### User Credentials
- [ ] Production admin email decided (not `*@example.com`)
- [ ] Strong production password generated
- [ ] Credentials saved in password manager
- [ ] Plan to access email for admin account

## 💳 Stripe Setup

### Stripe Account
- [ ] Stripe account created
- [ ] Business/product information filled out
- [ ] Products and pricing configured
- [ ] Test mode working locally

### API Keys
- [ ] Test API keys working in development
- [ ] Live API keys obtained (for production)
- [ ] Webhook endpoint URL planned: `https://your-domain.vercel.app/api/webhooks/stripe`
- [ ] Webhook events determined (checkout.session.completed, etc.)

### Testing
- [ ] Stripe checkout flow tested locally with test cards
- [ ] Webhook endpoint tested with Stripe CLI
- [ ] Subscription creation/cancellation tested
- [ ] Payment success/failure flows tested

## ☁️ Vercel Setup

### Account & Project
- [ ] Vercel account created
- [ ] Connected to GitHub account
- [ ] Team/workspace configured (if using teams)
- [ ] Project import permissions verified

### Domain Planning
- [ ] Decide on domain: Vercel subdomain or custom domain
- [ ] If custom domain: DNS access confirmed
- [ ] SSL certificate (automatic with Vercel, but verify)

### Build Configuration
- [ ] `next.config.ts` optimized for production
- [ ] `vercel.json` created (optional)
- [ ] Build commands tested locally
- [ ] Output directory correct (`.next` for standalone)

## 📝 Environment Variables

### Required Variables List
Create a checklist of all required environment variables:

**Database:**
- [ ] `DATABASE_URL` - Neon pooled connection string

**Authentication:**
- [ ] `NEXTAUTH_SECRET` - Generated secret for production
- [ ] `NEXT_PUBLIC_BASE_URL` - Production URL

**Stripe:**
- [ ] `STRIPE_SECRET_KEY` - Live mode secret key (sk_live_...)
- [ ] `STRIPE_WEBHOOK_SECRET` - Will be added after first deployment

**Application:**
- [ ] `NODE_ENV` - Set to "production"

### Production Seed Variables (for manual seeding only)
- [ ] `SEED_INSTRUCTOR_EMAIL` - Prepared (not added to Vercel)
- [ ] `SEED_INSTRUCTOR_PASSWORD` - Prepared (not added to Vercel)

## 📦 Dependencies

### Package Management
- [ ] `package.json` and `package-lock.json` committed
- [ ] All dependencies installed locally without errors
- [ ] No security vulnerabilities (`npm audit`)
- [ ] Production dependencies separated from dev dependencies

### Scripts
- [ ] `build` script works correctly
- [ ] `start` script ready for production
- [ ] Database scripts available (`db:migrate`, `db:seed`)

## 🐳 Docker (Optional)

If using Docker:
- [ ] `Dockerfile.prod` tested and working
- [ ] Docker image builds successfully
- [ ] Container runs without errors
- [ ] Environment variables properly passed to container

## 📚 Documentation

### Project Documentation
- [ ] README.md updated with deployment info
- [ ] DEPLOYMENT.md reviewed and understood
- [ ] QUICK_REFERENCE.md available for common tasks
- [ ] API documentation up to date (if applicable)

### Team Communication
- [ ] Team notified about deployment
- [ ] Deployment window scheduled (if needed)
- [ ] Rollback plan documented
- [ ] Contact information for support available

## 🧪 Pre-Deployment Testing

### Local Testing
- [ ] Fresh install works (`rm -rf node_modules && npm install`)
- [ ] Build from scratch succeeds (`rm -rf .next && npm run build`)
- [ ] Production build runs locally (`npm run build && npm start`)
- [ ] All critical paths tested (auth, enrollment, payment)

### Database Testing
- [ ] Migrations run successfully on clean database
- [ ] Seed script populates database correctly
- [ ] Data relationships correct
- [ ] No missing required fields

## ⚠️ Known Issues & Limitations

### Document Any
- [ ] Known bugs that won't be fixed pre-launch
- [ ] Features intentionally disabled for v1
- [ ] Browser compatibility limitations
- [ ] Rate limits or quotas to monitor

## 📞 Support & Monitoring

### Accounts Setup
- [ ] Vercel account notifications enabled
- [ ] Stripe account notifications enabled  
- [ ] Neon account notifications enabled
- [ ] Error tracking service configured (optional: Sentry, LogRocket)

### Monitoring Plan
- [ ] How to access Vercel deployment logs
- [ ] How to check Neon database metrics
- [ ] How to monitor Stripe webhook deliveries
- [ ] How to check application errors

## 🎯 Deployment Day Checklist

### Before Deployment
- [ ] All above items completed
- [ ] Team members available for support
- [ ] Backup window scheduled (low traffic time)
- [ ] Emergency contact list prepared

### During Deployment
- [ ] Follow DEPLOYMENT.md step by step
- [ ] Document any deviations from plan
- [ ] Save all credentials immediately
- [ ] Test each component as it's deployed

### After Deployment
- [ ] Verify all functionality works
- [ ] Check logs for errors
- [ ] Monitor for first hour
- [ ] Announce launch (if applicable)

## ✅ Final Verification

Before going live:
- [ ] Application loads correctly
- [ ] Database connections working
- [ ] User registration works
- [ ] Login works
- [ ] Free course access works
- [ ] Stripe checkout works (test mode first!)
- [ ] Webhook events received
- [ ] Admin account accessible
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Loading times acceptable

## 🚨 Emergency Contacts

Document important contacts:
- [ ] Your email: _______________
- [ ] Team lead: _______________
- [ ] Vercel support: support@vercel.com
- [ ] Stripe support: https://support.stripe.com
- [ ] Neon support: https://neon.tech/docs/introduction/support

## 📝 Post-Deployment Tasks

After successful deployment:
- [ ] Update README with production URL
- [ ] Document any deployment issues encountered
- [ ] Share credentials with appropriate team members (securely)
- [ ] Schedule first backup verification
- [ ] Plan first production database maintenance
- [ ] Set up monitoring dashboards
- [ ] Schedule post-launch review meeting

---

## Tips for Smooth Deployment

1. **Deploy Early in Development Cycle**: Don't wait until the last minute
2. **Test Staging First**: Use Vercel preview deployments
3. **Deploy During Low Traffic**: Choose off-peak hours
4. **Have a Rollback Plan**: Know how to revert if needed
5. **Monitor Closely**: Watch logs and metrics for first few hours
6. **Document Everything**: Keep notes on what you did
7. **Communicate**: Keep stakeholders informed of progress

---

**Ready to Deploy?** → Start with [DEPLOYMENT.md](DEPLOYMENT.md)

**Need Quick Commands?** → Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
