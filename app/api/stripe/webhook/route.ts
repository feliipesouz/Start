import { sendEmailTo } from "@/app/lib/ses";
import stripe from "@/app/lib/stripe";
import { generateEmailHTML, generateQRCodeBuffer } from "@/app/lib/utils";
import { deleteUserData } from "@/app/server/stripe/delete-user-data";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!secret || !signature) {
      throw new Error("Missing secret or signature");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        const metadata = event.data.object.metadata;
        if (
          metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID_BASIC ||
          metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID_PRO ||
          metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID_PREMIUM
        ) {
          await handleStripePayment(event);
        }
        break;

      case "checkout.session.expired":
        if (event.data.object.payment_status === "unpaid") {
          // O cliente saiu do checkout e expirou :(
          const id = event.data.object.metadata?.id;
          await deleteUserData(id as string);
        }
        break;

      case "checkout.session.async_payment_succeeded":
        if (event.data.object.payment_status === "paid") {
          // O cliente pagou o boleto e o pagamento foi confirmado
          const metadata = event.data.object.metadata;
          const id = metadata?.id;
          const userEmail = event.data.object.customer_details?.email;

          const productName = "Contador de tempo";

          if (userEmail) {
            const qrCodeValue = `https://voceeespecial.com.br/gift/${id}`;
            const emailBody = await generateEmailHTML(id as string, productName, qrCodeValue);

            const qrCodeBuffer = await generateQRCodeBuffer(qrCodeValue);

            await sendEmailTo({
              userEmail,
              emailSubject: "Compra com sucesso!",
              emailBody,
              attachmentContent: qrCodeBuffer,
            });
          }

        }
        break;

      case "checkout.session.async_payment_failed":
        if (event.data.object.payment_status === "unpaid") {
          // O cliente não pagou o boleto e ele venceu :(
          const id = event.data.object.metadata?.id;
          await deleteUserData(id as string);
        }
        break;
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Webhook error: ${error}`,
        ok: false,
      },
      { status: 500 }
    );
  }
}

