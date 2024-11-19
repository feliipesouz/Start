import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getSEOTags } from "../lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000", // Cor de fundo do seu app (No celular é a cor que fica no topo)
  width: "device-width",
  initialScale: 1,
};

// Isso adiciona tags SEO padrão a todas as páginas do nosso app.
// Você pode substituí-las em cada página passando parâmetros para a função getSEOTags().
export const metadata = getSEOTags({
  appName: "Você é Especial",
  appDescription: "Crie presentes personalizados e surpreenda quem você ama!",
  keywords: ["presente personalizado", "surpresa", "amor", "voceeespecial", "contador de relacionamento"],
  appDomain: "https://voceeespecial.com",
  locale: "pt_BR",
  canonicalUrlRelative: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
