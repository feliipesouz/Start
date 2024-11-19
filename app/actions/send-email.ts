"use server";

import { sendEmailTo } from "@/app/lib/ses";

export async function sendEmail(email: string) {
  return await sendEmailTo({
    userEmail: email,
    emailSubject: "Você é especial!",
    emailBody: `<html><body><p>Você recebeu o email de teste.</p></body></html>`,
  });
}
