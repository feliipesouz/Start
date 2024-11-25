import imageCompression from "browser-image-compression";



export const compressImage = (file: File): Promise<File> =>
  new Promise((resolve, reject) => {
    const options = {
      maxSizeMB: 0.2, // Set max size in MB
      maxWidthOrHeight: 900, // Max width/height
      useWebWorker: true, // Use web worker for compression
      fileType: "image/jpeg", // Convert to WebP format
    };

    imageCompression(file, options)
      .then((compressedFile: File) => {
        resolve(compressedFile);
      })
      .catch((error) => {
        console.log("Error compressing image", error);
        reject(error);
      });
  });

export const compressFiles = async (files: File[]): Promise<File[]> => {
  const compressPromises = files.map(async (file) => {
    try {
      return await compressImage(file);
    } catch (error) {
      console.error("Image compression error:", error);
      return null;
    }
  });

  return (await Promise.all(compressPromises)).filter(
    (file): file is File => file !== null
  );
};







import QRCode from "qrcode";


export async function generateQRCodeBuffer(qrCodeValue: string): Promise<Buffer> {
  try {
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeValue, {
      errorCorrectionLevel: "H", // Correção de erro alta
      type: "png",              // Formato esperado pela biblioteca (corrigido)
      width: 200,               // Tamanho do QR Code
    });
    return qrCodeBuffer;
  } catch (error) {
    console.error("Erro ao gerar QR Code como Buffer:", error);
    throw error;
  }
}



export async function generateEmailHTML(
  id: string,
  productName: string,
  qrCodeValue: string
): Promise<string> {

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Resumo da Compra</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 700px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #ef5da8cc;
        color: #ffffff;
        text-align: center;
        padding: 28px 0;
      }
      .header h1 {
        margin: 0;
        font-size: 26px;
        font-weight: bold;
      }
      .content {
        padding: 20px;
        position: relative;
        top: -50px;
      }
      .content h2 {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .content p {
        margin: 0;
        color: #555555;
        font-size: 14px;
        line-height: 1.6;
      }
      .summary-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 15px;
      }
      .summary-item p {
        margin: 0 0 0 10px
      }
      .summary-item span {
        font-size: 18px;
      }
      .qr-code-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 40px 0;
      }
      .qr-code {
        text-align: center;
      }
      .qr-code span {
        font-size: 20px;
        font-weight: bold;
        color: #ff007a;
      }
      .download-button a {
        background-color: #ff007a;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        display: inline-block;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777777;
        padding: 10px;
        background-color: #f4f4f4;
      }
    </style>
  </head>
  <body>
    <div style="padding: 20px; background-color: #f4f4f4;">
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>Seu produto chegou!!!</h1>
        </div>

        <!-- Content -->
        <div class="content">
          <h2>Resumo da compra:</h2>
          <div class="summary-item">
            <span>🏪</span>
            <p>
              Você comprou de <strong>VOCÊ É ESPECIAL</strong>
            </p>
          </div>
          <div class="summary-item">
            <span>🛒</span>
            <p>Em seu carrinho: ${productName} (x1)</p>
          </div>
          <div class="summary-item">
            <span>💵</span>
            <p>
              Pagamento realizado.
            </p>
          </div>

          <!-- QR Code and Download Section -->
          <div class="qr-code-section">
            <div class="qr-code">         
                <span>Seu QRCODE esta em anexo nesse e-mail.<span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Obrigado por comprar conosco!</p>
        <p>VOCÊ É ESPECIAL - Todos os direitos reservados</p>
      </div>
    </div>
  </body>
  </html>
  `;
}




export async function generateEmailWithBoletoHTML(
  hostedVoucherUrl: string
): Promise<string> {

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Resumo da Compra</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 700px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #ef5da8cc;
        color: #ffffff;
        text-align: center;
        padding: 28px 0;
      }
      .header h1 {
        margin: 0;
        font-size: 26px;
        font-weight: bold;
      }
      .content {
        padding: 20px;
        position: relative;
        top: -50px;
      }
      .content h2 {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .content p {
        margin: 0;
        color: #555555;
        font-size: 14px;
        line-height: 1.6;
      }
      .summary-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 15px;
      }
      .summary-item p {
        margin: 0 0 0 10px
      }
      .summary-item span {
        font-size: 18px;
      }
      .qr-code-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 40px 0;
      }
      .qr-code {
        text-align: center;
      }
      .qr-code span {
        font-size: 16px;
        font-weight: bold;
      }
      .download-button a {
        background-color: #ff007a;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        display: inline-block;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777777;
        padding: 10px;
        background-color: #f4f4f4;
      }
    </style>
  </head>
  <body>
    <div style="padding: 20px; background-color: #f4f4f4;">
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>Seu boleto esta pronto!!!</h1>
        </div>

        <!-- Content -->
        <div class="content">
          <h2>Seu presente esta te esperando... ❤</h2>
          <div class="summary-item">
            <span>🏪</span>
            <p>
              Nós da <strong>VOCÊ É ESPECIAL</strong> ficamos muito felizes de fazer parte desse momento.
            </p>
          </div>

          <!-- QR Code and Download Section -->
          <div class="qr-code-section">
            <div class="qr-code">
              <span>Segue o link do seu boleto para o pagamento:</span>
              <br />
              <br />
              <br />
              <a href="${hostedVoucherUrl}" target="_blank" style="color: #ff007a; text-decoration: none;">
                Clique aqui para acessar o boleto
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Obrigado por comprar conosco!</p>
        <p>VOCÊ É ESPECIAL - Todos os direitos reservados</p>
      </div>
    </div>
  </body>
  </html>
  `;
}