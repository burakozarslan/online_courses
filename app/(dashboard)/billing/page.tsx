import { getSubscriptionDetails } from "@/actions/subscription";
import BillingClientPage from "./BillingClientPage";

export default async function BillingPage() {
  const subscription = await getSubscriptionDetails();
  
  // Serialize dates for Client Component
  const serializedSubscription = subscription ? {
    ...subscription,
    stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd?.toISOString() ?? null,
  } : null;

  return <BillingClientPage subscription={serializedSubscription} />;
}
