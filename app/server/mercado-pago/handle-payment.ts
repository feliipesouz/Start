import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { sendEmailTo } from "@/app/lib/ses";
import { generateEmailHTML, generateQRCodeBuffer } from "@/app/lib/utils";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {

  const metadata = paymentData.metadata;
  const userEmail = metadata.user_email; // Lembrar que os metadados do Mercado Pago são convertidos para snake_case
  const id = metadata.id;

  const productName = "Contador de relacionamento";
  const qrCodeValue = `https://voceeespecial.com.br/gift/${id}`;
  const emailBody = await generateEmailHTML(id, productName, qrCodeValue);

  const qrCodeBuffer = await generateQRCodeBuffer(qrCodeValue);

  await sendEmailTo({
    userEmail,
    emailSubject: "Pagamento Aprovado - Seu Produto Está Pronto!",
    emailBody,
    attachmentContent: qrCodeBuffer,
  });

  return;
}
