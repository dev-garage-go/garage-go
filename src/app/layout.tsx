import type { Metadata } from "next";
import { CompanyDescription, CompanyName } from "@/constants/company-information";
import { inter } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: CompanyName,
  description: CompanyDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
