import type { Metadata } from "next";

import { GoogleAnalytics } from '@next/third-parties/google'

import { obtainLogo } from "@/assets/helpers";
import { CompanyDescription, CompanyName } from "@/features/home";
import { montserrat } from "@/config/fonts";

import { ContextsProvider } from "@/providers";

import "./globals.css";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const googleAnalythicsID = process.env.GOOGLE_ANALYTHICS_KEY

const titleMetadata = {
  template: CompanyName + ' - %s',
  default: CompanyName + ' - Home'
}

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: titleMetadata,
  description: CompanyDescription,
  openGraph: {
    title: titleMetadata,
    description: CompanyDescription,
    images: [obtainLogo('company', 'logoMetadata')]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        {process.env.NODE_ENV === 'production' && googleAnalythicsID && (
          <GoogleAnalytics gaId={googleAnalythicsID} />
        )}
        <ContextsProvider>
          {children}
        </ContextsProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
