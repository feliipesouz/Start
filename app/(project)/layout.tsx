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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LB9WMNE0WD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LB9WMNE0WD', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
