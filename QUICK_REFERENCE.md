# Quick Reference Guide

## Common Commands

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test
npm run test:watch

# Run E2E tests
npm run test:e2e
npm run test:e2e:ui

# Linting
npm run lint
```

### Database Operations

```bash
# Run migrations (development)
npx prisma migrate dev

# Run migrations (production)
npm run db:migrate
# OR
npx prisma migrate deploy

# Seed database (development)
npm run db:seed

# Seed database (production) - Interactive
./scripts/seed-production.sh

# Seed database (production) - Manual
export DATABASE_URL="postgresql://..."
export SEED_INSTRUCTOR_EMAIL="admin@domain.com"
export SEED_INSTRUCTOR_PASSWORD="secure-password"
export NODE_ENV="production"
npm run db:seed

# Open Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### Docker Commands

```bash
# Start development with Docker
npm run docker:dev

# Build production Docker image
npm run docker:build

# Run production Docker container
npm run docker:start
```

### Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Link to Vercel project
vercel link

# Pull environment variables
vercel env pull
vercel env pull .env.production

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs
```

## Environment Variables

### Required Variables

| Variable | Example | Usage |
|----------|---------|-------|
| `DATABASE_URL` | `postgresql://user:pass@host/db` | Database connection |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` | Auth session encryption |
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | Stripe API authentication |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook verification |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Application base URL |
| `NODE_ENV` | `development` or `production` | Environment mode |

### Production Seed Variables (only when seeding)

| Variable | Example | Usage |
|----------|---------|-------|
| `SEED_INSTRUCTOR_EMAIL` | `admin@domain.com` | Production admin email |
| `SEED_INSTRUCTOR_PASSWORD` | Strong password | Production admin password |

## Useful One-Liners

### Generate Secure Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate strong password
openssl rand -base64 24
```

### Database Inspection

```bash
# Check database connection
npx prisma db pull --print

# View current migration status
npx prisma migrate status

# Validate Prisma schema
npx prisma validate
```

### Git Operations

```bash
# Check status
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Your message"

# Push to remote
git push origin main

# Create and switch to new branch
git checkout -b feature/your-feature

# View commit history
git log --oneline --graph --decorate
```

## File Structure

```
online_courses/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (public)/          # Public pages
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── provider/         # Context providers
│   └── ui/               # UI components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── stripe.ts         # Stripe client
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Database seeding script
│   └── migrations/       # Migration files
├── scripts/              # Helper scripts
│   └── seed-production.sh # Production seed helper
├── .env.example          # Environment variables template
├── .env.local            # Local environment (gitignored)
├── DEPLOYMENT.md         # Full deployment guide
└── package.json          # Dependencies and scripts
```

## API Routes

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

### Enrollment
- `POST /api/enrollment` - Enroll in course
- `GET /api/enrollment?courseId=xxx` - Get enrollment status

### Subscription
- `GET /api/check-subscription` - Check user subscription status

### Stripe
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

## Troubleshooting

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Can't reach database server"
- Check DATABASE_URL is correct
- Verify database is running (local) or accessible (remote)
- Check SSL mode in connection string: `?sslmode=require`

### "NextAuth: No secret provided"
- Add NEXTAUTH_SECRET to environment variables
- Generate: `openssl rand -base64 32`

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
# OR
lsof -ti:3000 | xargs kill -9
```

### Clear Next.js cache
```bash
rm -rf .next
npm run build
```

### Stripe webhook not working
- Verify STRIPE_WEBHOOK_SECRET is set
- Check webhook endpoint URL matches your domain
- Test with Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Testing Credentials

### Development (seed.ts creates these)
- **Instructor**: `instructor@example.com` / `password123`
- **Student**: `free@example.com` / `password123`

### Stripe Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- Any future expiry date, any CVC, any ZIP

## Important URLs

### Development
- App: http://localhost:3000
- Prisma Studio: http://localhost:5555

### Production (replace with your domain)
- App: https://your-app.vercel.app
- Vercel Dashboard: https://vercel.com/dashboard
- Neon Console: https://console.neon.tech
- Stripe Dashboard: https://dashboard.stripe.com

## Performance Tips

### Database
- Use connection pooling (Neon provides this)
- Add indexes for frequently queried fields
- Use `select` to limit returned fields
- Batch queries where possible

### Next.js
- Use `next/image` for image optimization
- Enable SWR or React Query for data fetching
- Implement proper loading states
- Use static generation where possible

### Vercel
- Enable Edge Caching for static content
- Use Vercel Analytics for monitoring
- Optimize bundle size with `next-bundle-analyzer`

## Security Checklist

- [ ] All secrets in environment variables (not code)
- [ ] `.env*` files in .gitignore
- [ ] Strong production passwords used
- [ ] HTTPS enabled (Vercel does this automatically)
- [ ] Stripe webhook signature verification enabled
- [ ] NextAuth secret is strong and unique
- [ ] Database credentials are secure
- [ ] No test credentials in production database
- [ ] 2FA enabled on all service accounts

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
