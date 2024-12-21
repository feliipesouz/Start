import type { Metadata } from "next";

// Estes são todos os tags de SEO que você pode adicionar às suas páginas.
// Ele preenche os dados com título/descrição/OG padrão, etc. e você pode personalizá-lo para cada página.
// Já está adicionado no layout.js raiz, então você não precisa adicioná-lo a todas as páginas.
// Mas eu recomendo definir a URL canônica para cada página (export const metadata = getSEOTags({canonicalUrlRelative: "/"});)

export const getSEOTags = ({
  appName,
  appDescription,
  keywords,
  appDomain,
  locale,
  canonicalUrlRelative,
  extraTags,
}: {
  appName: string;
  appDescription: string;
  keywords: string[];
  appDomain: string;
  canonicalUrlRelative?: string;
  extraTags?: Metadata;
  locale?: string;
}): Metadata => {
  return {
    // até 50 caracteres (o que seu aplicativo faz pelo usuário?)
    title: appName,
    // até 160 caracteres (como seu aplicativo ajuda o usuário?)
    description: appDescription,
    keywords: keywords,
    applicationName: appName,
    // defina um prefixo de URL base para outros campos que requerem uma URL totalmente qualificada (.e.g og:image: og:image: 'https://seudominio.com/share.png' => '/share.png')
    metadataBase: new URL(appDomain),

    openGraph: {
      title: appName,
      description: appDescription,
      url: appDomain,
      siteName: appName,
      locale: locale,
      type: "website",
    },

    twitter: {
      title: appName,
      description: appDescription,
      card: "summary_large_image",
      creator: "@andreeliasdev",
    },
    alternates: {
      canonical: canonicalUrlRelative,
      languages: { pt: canonicalUrlRelative },
    },
    ...extraTags,
  };
};

