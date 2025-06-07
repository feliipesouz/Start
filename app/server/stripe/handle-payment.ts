import "server-only"; // Evita que o código seja executado no cliente

import { sendEmailTo } from "@/app/lib/ses";
import stripe from "@/app/lib/stripe";

import Stripe from "stripe";
import { generateEmailHTML, generateEmailWithBoletoHTML, generateQRCodeBuffer } from "@/app/lib/utils";

export async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    // pagagamento por cartão com sucesso
    const metadata = event.data.object.metadata;
    const id = metadata?.id;
    const userEmail = event.data.object.customer_details?.email;

    if (userEmail) {

      const productName = "Contador de tempo";
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

  if (
    event.data.object.payment_status === "unpaid" &&
    event.data.object.payment_intent
  ) {
    // Pagamento por boleto
    const paymentIntent = await stripe.paymentIntents.retrieve(
      event.data.object.payment_intent.toString()
    );

    const hostedVoucherUrl =
      paymentIntent.next_action?.boleto_display_details?.hosted_voucher_url;

    if (hostedVoucherUrl) {
      // O cliente gerou um boleto, manda um email pra ele
      const userEmail = event.data.object.customer_details?.email;

      if (userEmail) {
        const emailBody = await generateEmailWithBoletoHTML(hostedVoucherUrl);

        await sendEmailTo({
          userEmail,
          emailSubject: "Seu boleto está pronto para pagamento!",
          emailBody,
        });
      }
    }
  }
}
