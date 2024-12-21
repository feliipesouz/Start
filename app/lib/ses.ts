import { SendRawEmailCommand, SES } from "@aws-sdk/client-ses";

export const ses = new SES({
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY!,
    secretAccessKey: process.env.SES_SECRET_KEY!,
  },
  region: "us-east-1",
});

export async function sendEmailTo({
  userEmail,
  emailSubject,
  emailBody,
  attachmentName = "qrcode.png", 
  attachmentContent,
}: {
  userEmail: string;
  emailSubject: string;
  emailBody: string;
  attachmentName?: string; 
  attachmentContent?: Buffer; 
}) {
  const boundary = `----Boundary${Date.now()}`; 

  // Construa o e-mail completo em formato MIME
  const rawEmailParts: string[] = [
    `From: ${process.env.SES_SOURCE_ADDRESS}`,
    `To: ${userEmail}`,
    `Subject: ${emailSubject}`,
    `MIME-Version: 1.0`,
  ];

  if (attachmentContent) {
    // Caso tenha um anexo
    rawEmailParts.push(
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      "",
      emailBody, 
      "",
      `--${boundary}`,
      `Content-Type: image/png; name="${attachmentName}"`,
      `Content-Transfer-Encoding: base64`,
      `Content-Disposition: attachment; filename="${attachmentName}"`,
      "",
      attachmentContent.toString("base64"), // Converta o Buffer do QR Code para Base64
      "",
      `--${boundary}--`
    );
  } else {
    // Caso não tenha anexo
    rawEmailParts.push(
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      "",
      emailBody
    );
  }

  const rawEmail = rawEmailParts.join("\r\n"); 

  // Envie o email com SES
  try {
    const command = new SendRawEmailCommand({
      RawMessage: {
        Data: Buffer.from(rawEmail),
      },
    });
    const emailSent = await ses.send(command);
    return emailSent.MessageId;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return false;
  }
}
