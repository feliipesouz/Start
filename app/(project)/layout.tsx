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
  keywords: [
    "presente personalizado",
    "surpresa criativa",
    "presente romântico",
    "contador de relacionamento",
    "voceeespecial",
    "surpresa para namorado",
    "presentes com fotos e música",
  ],
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
        {/* SEO Essentials */}
        <link rel="canonical" href="https://voceeespecial.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Você é Especial" />

        {/* Open Graph */}
        <meta property="og:title" content="Você é Especial" />
        <meta
          property="og:description"
          content="Transforme lembranças em presentes inesquecíveis com fotos, música e carinho. Ideal para casais, amigos e família."
        />
        <meta property="og:url" content="https://voceeespecial.com/" />
        <meta property="og:image" content="https://voceeespecial.com/og-banner.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Você é Especial" />
        <meta
          name="twitter:description"
          content="Presenteie com emoção. Crie experiências únicas com fotos e música para quem você ama."
        />
        <meta name="twitter:image" content="https://voceeespecial.com/og-banner.png" />

        {/* Favicon & Web App */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Google Analytics */}
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
