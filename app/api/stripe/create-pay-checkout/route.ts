import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testeId, userEmail, selectedPlan } = await req.json();

  console.log(selectedPlan)

  const price =
    selectedPlan === "basic" ? process.env.STRIPE_PRODUCT_PRICE_ID_BASIC :
      selectedPlan === "pro" ? process.env.STRIPE_PRODUCT_PRICE_ID_PRO :
        selectedPlan === "lifetime" ? process.env.STRIPE_PRODUCT_PRICE_ID_PREMIUM :
          null;

  console.log(price)

  if (!price)
    throw new Error(
      "No STRIPE_PRODUCT_PRO_PRICE_ID or STRIPE_PRODUCT_BASIC_PRICE_ID"
    );

  const metadata = {
    testeId,
    price,
    userEmail,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card", "boleto"],
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: metadata,
      ...(userEmail && { customer_email: userEmail }),
    });

    if (!session.url) {
      throw new Error("No session URL");
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
