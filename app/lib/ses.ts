// import { SendEmailCommandInput, SES } from "@aws-sdk/client-ses";

// export const ses = new SES({
//   credentials: {
//     accessKeyId: process.env.SES_ACCESS_KEY!,
//     secretAccessKey: process.env.SES_SECRET_KEY!,
//   },
//   region: "us-east-2",
// });

// export async function sendEmailTo({
//   userEmail,
//   emailSubject,
//   emailBody,
// }: {
//   userEmail: string;
//   emailSubject: string;
//   emailBody: string;
// }) {
//   if (!userEmail || !emailSubject || !emailBody) return false;

//   const params: SendEmailCommandInput = {
//     Destination: {
//       ToAddresses: [userEmail], // É uma lista, então você pode adicionar mais emails se quiser
//     },
//     Message: {
//       Subject: {
//         Charset: "UTF-8",
//         Data: emailSubject,
//       },
//       Body: {
//         Html: {
//           Charset: "UTF-8",
//           Data: emailBody, // Formate em HTML (Mandando sem formatação tem mais chances de cair no spam)
//         },
//       },
//     },
//     Source: process.env.SES_SOURCE_ADDRESS, // Email em que você vai enviar o email (Siga esse padrão: "André Dev" <me@andreelias.dev>)
//     ReplyToAddresses: [process.env.SES_REPLY_TO_ADDRESS!], // Email em que você vai receber quando alguém responder seu email
//   };

//   try {
//     const emailSent = await ses.sendEmail(params);
//     return emailSent.MessageId;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }



// import { SendRawEmailCommand, SES } from "@aws-sdk/client-ses";

// export const ses = new SES({
//   credentials: {
//     accessKeyId: process.env.SES_ACCESS_KEY!,
//     secretAccessKey: process.env.SES_SECRET_KEY!,
//   },
//   region: "us-east-2",
// });

// export async function sendEmailTo({
//   userEmail,
//   emailSubject,
//   emailBody,
//   attachmentName = "qrcode.png", // Nome padrão do arquivo
//   attachmentContent, // Buffer do conteúdo do anexo
// }: {
//   userEmail: string;
//   emailSubject: string;
//   emailBody: string;
//   attachmentName?: string;
//   attachmentContent: Buffer; // O QR Code em formato Buffer
// }) {
//   const boundary = `----Boundary${Date.now()}`; // Delimitador para separar as partes do email

//   // Construa o email completo em formato MIME
//   const rawEmail = [
//     `From: ${process.env.SES_SOURCE_ADDRESS}`,
//     `To: ${userEmail}`,
//     `Subject: ${emailSubject}`,
//     `MIME-Version: 1.0`,
//     `Content-Type: multipart/mixed; boundary="${boundary}"`,
//     "",
//     `--${boundary}`,
//     `Content-Type: text/html; charset=UTF-8`,
//     `Content-Transfer-Encoding: 7bit`,
//     "",
//     emailBody, // Corpo do email em HTML
//     "",
//     `--${boundary}`,
//     `Content-Type: image/png; name="${attachmentName}"`,
//     `Content-Transfer-Encoding: base64`,
//     `Content-Disposition: attachment; filename="${attachmentName}"`,
//     "",
//     attachmentContent.toString("base64"), // Converta o Buffer do QR Code para Base64
//     "",
//     `--${boundary}--`,
//   ].join("\n");

//   // Envie o email com SES
//   try {
//     const command = new SendRawEmailCommand({
//       RawMessage: {
//         Data: Buffer.from(rawEmail),
//       },
//     });
//     const emailSent = await ses.send(command);
//     return emailSent.MessageId;
//   } catch (error) {
//     console.error("Erro ao enviar email:", error);
//     return false;
//   }
// }




import { SendRawEmailCommand, SES } from "@aws-sdk/client-ses";

export const ses = new SES({
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY!,
    secretAccessKey: process.env.SES_SECRET_KEY!,
  },
  region: "us-east-2",
});

export async function sendEmailTo({
  userEmail,
  emailSubject,
  emailBody,
  attachmentName,
  attachmentContent,
}: {
  userEmail: string;
  emailSubject: string;
  emailBody: string;
  attachmentName?: string; // Nome do anexo, opcional
  attachmentContent?: Buffer; // Buffer do conteúdo do anexo, opcional
}) {
  const boundary = `----Boundary${Date.now()}`; // Delimitador para separar as partes do email

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
      emailBody, // Corpo do email em HTML
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

  const rawEmail = rawEmailParts.join("\n");

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
