import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Página Simple",
  description: "Una web minimalista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 'antialiased' hace que las fuentes se vean más nítidas */}
      <body className={`${inter.className} antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
