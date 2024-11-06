import MercadoPagoButton from "@/app/components/marcado-pago-button";
import StripeButton from "@/app/components/stripe-button";

export default function Pagamentos() {
  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col">
      <div className="h-full flex flex-col gap-4 items-center justify-center text-sm">
        <h1 className="text-2xl font-bold">Pagamentos</h1>
        <MercadoPagoButton
          testeId="123"
          disabled={!process.env.MERCADO_PAGO_ACCESS_TOKEN}
          email={undefined} payment={""}
          confirmaPix={false}
        >
          Mercado Pago - Pagamento único
        </MercadoPagoButton>
        <StripeButton
          isSubscription={false}
          disabled={false}
          email={""}
          selectedPlan={""}
          payment={""}
          confirmCard={false}
        // disabled={!process.env.STRIPE_PRODUCT_PRICE_ID}
        >
          Stripe - Pagamento único
        </StripeButton>
        <StripeButton
          isSubscription={true}
          disabled={!process.env.STRIPE_SUBSCRIPTION_PRICE_ID}
          email={""}
          selectedPlan={""}
          payment={""}
          confirmCard={false}
        >
          Stripe - Assinatura
        </StripeButton>
      </div>
    </div>
  );
}
