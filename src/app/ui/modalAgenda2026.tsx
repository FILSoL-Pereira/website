"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { AgendaSlot } from "@/app/data/agenda2026";

export default function ModalAgenda2026({
  slot,
  onClose,
}: {
  slot: AgendaSlot | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!slot) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [slot]);

  if (!slot) return null;

  const speakers = slot.speakers ?? [];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-0"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 sm:p-8 rounded-2xl sm:max-w-3xl w-full relative shadow-2xl max-h-[85vh] overflow-y-auto border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-amber-500"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-amber-400 font-bold text-lg">{slot.time}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300 text-sm">{slot.duration}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
          {slot.title}
        </h3>

        <p className="text-sm text-slate-400 mb-6">
          Eje temático:{" "}
          <span className="text-slate-200 font-medium">{slot.track}</span>
        </p>

        {speakers.length > 0 && (
          <div className="flex flex-col gap-4 mb-6">
            {speakers.map((sp) => (
              <div
                key={sp.id}
                className="flex items-center gap-3 sm:gap-4 bg-slate-800/60 rounded-xl p-3 border border-slate-700"
              >
                <Image
                  src={sp.img || "/Flisol.svg"}
                  alt={`Foto de ${sp.name}`}
                  width={80}
                  height={80}
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-500 bg-slate-900 shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <p className="text-base sm:text-xl font-semibold break-words">{sp.name}</p>
                  {sp.handle && (
                    <p className="text-sm text-slate-400">{sp.handle}</p>
                  )}
                  {sp.social && (
                    <a
                      href={sp.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-400 hover:underline text-sm mt-1 w-fit"
                    >
                      <Github size={16} /> Ver perfil
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {slot.talkInfo && (
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
            {slot.talkInfo}
          </p>
        )}

        {slot.notes && (
          <div className="text-sm text-slate-400 border-l-2 border-amber-500/60 pl-4 mb-4">
            {slot.notes}
          </div>
        )}

        {slot.repo && (
          <a
            href={slot.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-400 hover:underline"
          >
            <ExternalLink size={16} /> Conocer más
          </a>
        )}
      </div>
    </div>
  );
}
