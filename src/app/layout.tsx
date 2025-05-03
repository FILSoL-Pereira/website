import type { Metadata } from "next";
import { montserrat } from "@/app/utils/fonts";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import SponsorsSection from "./components/sponsors";

export const metadata: Metadata = {
  title: "FLISoL | Pereira 2025 | 21ᵃ Edición",
  description:
    "Bienvenidos al sitio oficial del FLISoL Pereira 2025 | El mayor evento de software libre en Latinoamérica en su edición 21.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="fiJweMrwkOO5CtBh6uhUcVg7yURX1ybgNLRxRz866K4"
        />
      </head>
      <body className={`${montserrat} antialiased min-h-screen`}>
        <Header />
        {children}
        <SponsorsSection />
        <Footer />
      </body>
    </html>
  );
}
