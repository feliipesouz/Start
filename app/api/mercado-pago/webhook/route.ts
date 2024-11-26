import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";
import { handleMercadoPagoPayment } from "@/app/server/mercado-pago/handle-payment";
import { deleteUserData } from "@/app/server/stripe/delete-user-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;    

    console.log(data)

    if (type === "payment") {
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id: data.id });

      const metadata = paymentData.metadata;
      console.log(metadata)
      const userId = metadata?.id; // O ID salvo no Firebase

      if (paymentData.status === "approved") {
        // Processar pagamentos aprovados (PIX ou cartão)
        await handleMercadoPagoPayment(paymentData);
      } else if (paymentData.status === "pending") {
        // Pagamento pendente (não precisa ação direta agora)
        console.log("Pagamento pendente:", userId);
      } else if (
        paymentData.status === "cancelled" ||
        paymentData.status === "rejected" ||
        paymentData.status === "expired"
      ) {
        // Pagamento cancelado, rejeitado ou expirado - deletar dados do Firebase
        if (userId) {
          await deleteUserData(userId);
          console.log(`Dados do usuário ${userId} removidos do Firebase.`);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Erro no Webhook:", error);
    return NextResponse.json({ error: "Falha no Webhook" }, { status: 500 });
  }
}
