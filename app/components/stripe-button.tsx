"use client";

import useStripe from "../hooks/useStripe";

export default function StripeButton({
  isSubscription,
  email,
  selectedPlan,
  children,
  payment,
  confirmCard,
  ...props
}: {
  isSubscription: boolean;
  email: string | undefined;
  selectedPlan: string;
  payment: string;
  confirmCard: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { createPaymentStripeCheckout, createSubscriptionStripeCheckout } =
    useStripe();

  function handleCheckout() {
    if (isSubscription) {
      return createSubscriptionStripeCheckout({ email });
    }
    return createPaymentStripeCheckout({ email, selectedPlan });
  }

  return (
    <button {...props}>
      {children}
    </button>
  );
}
