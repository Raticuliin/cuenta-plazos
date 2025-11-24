import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculadora de Días Hábiles y Laborables | CuentaPlazos - España",
  description:
    "Calcula plazos legales en España con festivos por comunidad autónoma. Calculadora gratuita de días hábiles, laborables y naturales. Ideal para plazos procesales, despidos, multas y alegaciones tributarias.",
  keywords: [
    "calculadora dias habiles",
    "calculo dias laborables",
    "plazos legales españa",
    "contador dias habiles",
    "festivos por comunidad autonoma",
    "plazos procesales",
    "calculo de plazos",
    "calculadora fecha vencimiento",
    "dias habiles sin festivos",
    "calculadora plazos juridicos",
  ],
  authors: [{ name: "CuentaPlazos" }],
  creator: "CuentaPlazos",
  publisher: "CuentaPlazos",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://cuenta-plazos.vercel.app",
    siteName: "CuentaPlazos",
    title: "Calculadora de Días Hábiles y Laborables | CuentaPlazos",
    description:
      "Herramienta profesional para calcular plazos legales en España. Considera festivos autonómicos, días hábiles, laborables y naturales.",
    images: [
      {
        url: "https://cuenta-plazos.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CuentaPlazos - Calculadora de Días Hábiles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Días Hábiles y Laborables | CuentaPlazos",
    description:
      "Calcula plazos legales en España con festivos por comunidad autónoma. Gratuita y precisa.",
    images: ["https://cuenta-plazos.vercel.app/og-image.png"],
    creator: "@cuentaplazos",
  },
  alternates: {
    canonical: "https://cuenta-plazos.vercel.app",
  },
  verification: {
    google: "verification_token_placeholder",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CuentaPlazos",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  description:
    "Calculadora profesional de días hábiles, laborables y naturales para España. Considera festivos oficiales por comunidad autónoma.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  featureList: [
    "Cálculo de días hábiles",
    "Cálculo de días laborables",
    "Cálculo de días naturales",
    "Festivos por comunidad autónoma",
    "Presets para casos legales comunes",
    "Calendario visual interactivo",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
  },
  inLanguage: "es-ES",
  availableOnDevice: ["Desktop", "Mobile", "Tablet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/* 'antialiased' hace que las fuentes se vean más nítidas */}
      <body className={`${inter.className} antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
