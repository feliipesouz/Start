import type { Viewport } from "next";
import { getSEOTags } from "@/app/lib/seo";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata = getSEOTags({
  appName: "Você é Especial - Landing Page",
  appDescription: "Surpreenda quem você ama com presentes personalizados.",
  keywords: [
    "Contador de relacionamento",
    "Contador de tempo",
    "Você é Especial",
    "Presentes personalizados",
    "Surpresas",
    "Amor",
  ],
  appDomain: "https://voceeespecial.com/",
  locale: "pt_BR",
  canonicalUrlRelative: "/landing-page",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LB9WMNE0WD"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LB9WMNE0WD');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
