import type { Viewport } from "next";
import { getSEOTags } from "@/app/lib/seo";

export const viewport: Viewport = {
  themeColor: "#000000", // Cor de fundo do seu app (No celular é a cor que fica no topo)
  width: "device-width",
  initialScale: 1,
};

// Isso adiciona tags SEO padrão a todas as páginas do nosso app.
// Você pode substituí-las em cada página passando parâmetros para a função getSEOTags().
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
      <body>{children}</body>
    </html>
  );
}
