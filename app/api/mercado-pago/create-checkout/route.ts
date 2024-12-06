import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";

import { Payment, MercadoPagoConfig } from 'mercadopago';

export async function POST(req: NextRequest) {
  const { id, userEmail, selectedPlan } = await req.json();

  const price =
    selectedPlan === "basic" ? "19,90" :
      selectedPlan === "pro" ? "28,90" :
        selectedPlan === "lifetime" ? "33,90" :
          "33,90";


  try {
    const preference = new Preference(mpClient);

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 20);

    const createdPreference = await preference.create({
      body: {
        external_reference: id, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          id, // O Mercado Pago converte para snake_case, ou seja, id vai virar teste_id
          userEmail: userEmail,
          plan: selectedPlan
          //etc
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
          },
        }),

        items: [
          {
            id: id,//"id-do-seu-produto",
            description: "Sua página personalizada que celebra uma relação especial, seja de namoro, amizade, família ou qualquer vínculo onde haja um sentimento verdadeiro.",
            title: "Contador de relacionamento",
            quantity: 1,
            unit_price: price,
            currency_id: "BRL",
            category_id: "category", // Recomendado inserir, mesmo que não tenha categoria - Aumenta a pontuação da sua integração com o Mercado Pago
          },
        ],
        payment_methods: {
          // Descomente para desativar métodos de pagamento
          excluded_payment_methods: [
            {
              id: "bolbradesco",
            },
            {
              id: "pec",
            },
          ],
          excluded_payment_types: [
            {
              id: "debit_card",
            },
            {
              id: "credit_card",
            },
          ],
          installments: 2, // Número máximo de parcelas permitidas
          default_payment_method_id: "pix",
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/?status=sucesso`,
          failure: `${req.headers.get("origin")}/?status=falha`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
        },
        date_of_expiration: expirationDate.toISOString(),
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
