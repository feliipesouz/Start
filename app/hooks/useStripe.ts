import { useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const useStripe = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
      );
      setStripe(stripeInstance);
    }

    loadStripeAsync();
  }, []);

  async function createPaymentStripeCheckout(checkoutData: any) {
    if (!stripe) {
      throw new Error("Stripe instance not loaded");
    }

    console.log('checkoutData')
    console.log(checkoutData)
    try {
      const response = await fetch("/api/stripe/create-pay-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      toast.error(`Error creating payment checkout`);
      console.log(error);
    }
  }

  return {
    createPaymentStripeCheckout,
  };
};

export default useStripe;
