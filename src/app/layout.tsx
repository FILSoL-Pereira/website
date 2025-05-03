import type { Metadata } from "next";
import { montserrat } from "@/app/utils/fonts";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import SponsorsSection from "./components/sponsors";

export const metadata: Metadata = {
  title: "FLISoL | Pereira 2025 | 21",
  description:
    "Bienvenidos al sitio oficial del FLISoL Pereira 2025 | El mayor evento de software libre en Latinoamérica en su edición 21. ¡Charlas, talleres y comunidad en un solo lugar!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat} antialiased min-h-screen`}>        
        <Header />
        {children}
        <SponsorsSection />
        <Footer />
      </body>
    </html>
  );
}
