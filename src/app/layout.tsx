import type { Metadata } from "next";
import { CompanyDescription, CompanyName } from "@/constants/company-information";
import { montserrat } from "@/config/fonts";

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
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
