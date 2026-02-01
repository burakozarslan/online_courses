import { getSubscriptionDetails } from "@/actions/subscription";
import SettingsClientPage from "./SettingsClientPage";

export default async function SettingsPage() {
  const subscription = await getSubscriptionDetails();
  
  // Serialize dates for Client Component
  const serializedSubscription = subscription ? {
    ...subscription,
    stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd?.toISOString() ?? null,

  } : null;

  return <SettingsClientPage subscription={serializedSubscription} />;
}
