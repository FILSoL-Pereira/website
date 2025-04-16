import type { Metadata } from "next";
import { montserrat } from "@/app/utils/fonts";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "FLISoL Pereira 2025",
  description:
    "Sitio oficial del Festival Latinoamericano de Instalación de Software Libre - Pereira 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat} antialiased`}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
