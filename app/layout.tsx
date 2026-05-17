import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { OG_IMAGE, SITE_ICONS, sharedOpenGraph } from "@/constants/metadata";
import { SITE_DESCRIPTION, SITE_URL } from "@/constants/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Costo Real Dólar",
    default: "Calculadora Dólar Tarjeta, MEP y Blue - Costo Real con Impuestos",
  },
  description: SITE_DESCRIPTION,
  icons: SITE_ICONS,
  openGraph: {
    description: SITE_DESCRIPTION,
    ...sharedOpenGraph,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-zinc-900">
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
