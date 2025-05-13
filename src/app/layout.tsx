import type { Metadata } from "next";

import { CompanyLogoMetadata } from "@/assets";
import { CompanyDescription, CompanyName } from "@/constants";
import { montserrat } from "@/config/fonts";

import "./globals.css";
import { ContextsProvider } from "@/contexts/ContextsProvider";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

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
    images: [CompanyLogoMetadata]
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
        <ContextsProvider>
          {children}
        </ContextsProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
