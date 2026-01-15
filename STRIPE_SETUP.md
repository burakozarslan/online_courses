# Stripe Checkout Setup & Testing Guide

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# Stripe Keys (Get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Installation

Install the Stripe SDK if not already installed:

```bash
npm install stripe
```

## Getting Stripe Test Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create an account or sign in
3. Toggle to "Test mode" (top right)
4. Navigate to **Developers > API keys**
5. Copy your:
   - **Publishable key** (`pk_test_...`)
   - **Secret key** (`sk_test_...`)

## Setting Up Webhooks

### Option 1: Using Stripe CLI (Recommended for Local Testing)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli

2. Login to your Stripe account:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy the webhook signing secret (`whsec_...`) from the CLI output and add it to your `.env.local`

### Option 2: Using Stripe Dashboard

1. Go to **Developers > Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your endpoint URL (e.g., `https://yourdomain.com/api/webhooks/stripe`)
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the signing secret and add it to your `.env.local`

## Creating a Test Price

1. Go to **Products** in Stripe Dashboard
2. Click **Add product**
3. Fill in:
   - **Name**: Pro Membership
   - **Pricing**: Recurring (Monthly or Yearly)
   - **Price**: e.g., $9.99/month
4. Save and copy the **Price ID** (starts with `price_...`)

## Testing the Flow

### 1. Start Your Development Server

```bash
npm run dev
```

### 2. Start Stripe CLI (in a separate terminal)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 3. Test Checkout Flow

1. **Sign in** to your application as a student
2. Navigate to the **pricing page**
3. Click on a subscription plan
4. This should trigger a POST request to `/api/checkout` with the `priceId`
5. You'll be redirected to Stripe Checkout
6. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
7. Complete the checkout
8. You should be redirected to `/overview?success=true`

### 4. Verify Database Updates

After successful checkout, verify the student record was updated:

```sql
SELECT 
  membership, 
  "stripeCustomerId", 
  "stripeSubscriptionId", 
  "stripePriceId", 
  "stripeCurrentPeriodEnd"
FROM "Student"
WHERE "userId" = 'your-user-id';
```

Expected results:
- `membership`: `PRO`
- `stripeCustomerId`: Populated
- `stripeSubscriptionId`: Populated
- `stripePriceId`: Populated
- `stripeCurrentPeriodEnd`: Future date

### 5. Test Webhook Events

#### Test Subscription Update:

```bash
stripe trigger customer.subscription.updated
```

#### Test Subscription Cancellation:

```bash
stripe trigger customer.subscription.deleted
```

Verify the database is updated accordingly (membership downgraded to FREE, subscription fields cleared).

## Stripe Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |
| 4000 0027 6000 3184 | Requires authentication (3D Secure) |

## Troubleshooting

### Webhook Not Receiving Events

- Verify Stripe CLI is running
- Check that the webhook secret is correct in `.env.local`
- Look at server logs for errors
- Check Stripe Dashboard > Developers > Webhooks > Logs

### Checkout Session Creation Fails

- Verify `STRIPE_SECRET_KEY` is correct
- Ensure the `priceId` is valid and in test mode
- Check server logs for detailed error messages

### Database Not Updating

- Check that webhook signature verification is passing
- Verify `studentId` is in the checkout session metadata
- Look for errors in webhook handler logs
- Check Stripe webhook delivery attempts in Dashboard

## Production Checklist

Before going to production:

1. ✅ Switch to live Stripe keys (remove `_test_` from keys)
2. ✅ Configure webhook endpoint in Stripe Dashboard with live endpoint URL
3. ✅ Test with real payment methods
4. ✅ Set up proper error logging and monitoring
5. ✅ Add subscription management UI (cancel, update)
6. ✅ Implement proper error handling for failed payments
7. ✅ Add email notifications for subscription events
8. ✅ Review Stripe security best practices

## API Reference

### POST /api/checkout

**Request:**
```json
{
  "priceId": "price_1ABC..."
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/..."
}
```

**Errors:**
- `401`: User not authenticated
- `400`: Invalid priceId
- `404`: Student profile not found
- `500`: Stripe or database error

### POST /api/webhooks/stripe

Webhook endpoint for Stripe events. Returns `200` for all events to acknowledge receipt.

**Handled Events:**
- `checkout.session.completed`: Activates PRO membership
- `customer.subscription.updated`: Updates subscription details
- `customer.subscription.deleted`: Downgrades to FREE membership
