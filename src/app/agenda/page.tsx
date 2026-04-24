import type { Metadata } from "next";
import AgendaView from "./AgendaView";

export const metadata: Metadata = {
  title: "Agenda y ponentes | FLISoL Pereira 2026",
  description:
    "Programación completa y ponentes del FLISoL Pereira 2026 — 7 de mayo en el Auditorio Jorge Roa Martínez de la UTP. Charlas sobre software libre, IA, desarrollo y comunidad.",
};

export default function AgendaPage() {
  return <AgendaView />;
}
