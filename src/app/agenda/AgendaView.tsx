"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CirclePlus, Coffee, Mic2, Github } from "lucide-react";
import ModalAgenda2026 from "@/app/ui/modalAgenda2026";
import {
  agenda2026,
  agendaSummary,
  uniqueSpeakers,
  type AgendaSlot,
  type Speaker,
  type Track,
} from "@/app/data/agenda2026";

const trackBadgeClass: Record<Track, string> = {
  "Cultura libre & Open Source":
    "bg-sky-500/20 text-sky-300 border-sky-500/40",
  "Desarrollo de Software":
    "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
  "Inteligencia Artificial":
    "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
  "Industria & Soluciones":
    "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  Logística: "bg-slate-500/20 text-slate-300 border-slate-500/40",
};

const statusBadgeClass: Record<AgendaSlot["status"], string> = {
  confirmed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  na: "hidden",
};

const statusText: Record<AgendaSlot["status"], string> = {
  confirmed: "Confirmado",
  pending: "Pendiente",
  na: "",
};

function joinNames(speakers: Speaker[]): string {
  if (speakers.length === 0) return "";
  if (speakers.length === 1) return speakers[0].name;
  if (speakers.length === 2)
    return `${speakers[0].name} y ${speakers[1].name}`;
  return (
    speakers.slice(0, -1).map((s) => s.name).join(", ") +
    ` y ${speakers[speakers.length - 1].name}`
  );
}

function SpeakerAvatars({ speakers }: { speakers: Speaker[] }) {
  if (speakers.length === 0) {
    return (
      <Image
        src="/Flisol.svg"
        alt="FLISoL"
        width={80}
        height={80}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-500 bg-slate-900 shrink-0"
      />
    );
  }

  if (speakers.length === 1) {
    const sp = speakers[0];
    return (
      <Image
        src={sp.img || "/Flisol.svg"}
        alt={`Foto de ${sp.name}`}
        width={80}
        height={80}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-500 bg-slate-900 shrink-0"
      />
    );
  }

  return (
    <div className="flex items-center -space-x-4 shrink-0">
      {speakers.map((sp, idx) => (
        <Image
          key={sp.id}
          src={sp.img || "/Flisol.svg"}
          alt={`Foto de ${sp.name}`}
          width={80}
          height={80}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-amber-500 bg-slate-900 ring-2 ring-gray-800"
          style={{ zIndex: speakers.length - idx }}
        />
      ))}
    </div>
  );
}

function LogisticsCard({ slot }: { slot: AgendaSlot }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 backdrop-blur-sm p-4 rounded-lg shadow-md w-full max-w-md z-10 opacity-90">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-900 border border-amber-500/60 flex items-center justify-center shrink-0">
          <Mic2 className="text-amber-400" size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-base sm:text-lg font-semibold text-slate-100 leading-snug">
            {slot.title}
          </p>
          <p className="text-sm text-slate-400">
            {slot.presenter ?? "Logística"} · {slot.duration}
          </p>
        </div>
      </div>
      {slot.notes && (
        <p className="text-sm text-slate-400 mt-2">{slot.notes}</p>
      )}
    </div>
  );
}

function BreakCard({ slot }: { slot: AgendaSlot }) {
  return (
    <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-500/50 p-5 rounded-lg shadow-md w-full max-w-md z-10">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
          <Coffee className="text-slate-900" size={22} />
        </div>
        <div className="min-w-0">
          <p className="text-lg sm:text-xl font-bold text-white">
            {slot.title}
          </p>
          <p className="text-sm text-amber-200 flex items-center gap-1">
            <Coffee size={14} /> {slot.duration}
          </p>
        </div>
      </div>
      {slot.notes && (
        <p className="text-sm text-amber-100/80 mt-2">{slot.notes}</p>
      )}
    </div>
  );
}

function TalkCard({
  slot,
  onSelect,
}: {
  slot: AgendaSlot;
  onSelect: (slot: AgendaSlot) => void;
}) {
  const speakers = slot.speakers ?? [];

  return (
    <div className="bg-gray-800 border border-slate-700 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md z-10 transform transition-transform duration-300 hover:scale-[1.02] active:scale-[1.02]">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${trackBadgeClass[slot.track]}`}
        >
          {slot.track}
        </span>
        <span className="text-[11px] text-slate-400">· {slot.duration}</span>
        {slot.featured && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            ★ Destacada
          </span>
        )}
        {slot.status !== "na" && (
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusBadgeClass[slot.status]}`}
          >
            {statusText[slot.status]}
          </span>
        )}
      </div>

      <div className="flex flex-row items-center gap-3 sm:gap-4">
        <SpeakerAvatars speakers={speakers} />
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold break-words line-clamp-3 text-white leading-tight">
            {slot.title}
          </h3>
          {speakers.length > 0 && (
            <p className="text-sm text-gray-300 break-words mt-1">
              {joinNames(speakers)}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center mt-3">
        <button
          onClick={() => onSelect(slot)}
          className="flex items-center gap-2 text-sm text-amber-400 hover:underline"
        >
          <CirclePlus size={18} /> Ver más
        </button>
      </div>
    </div>
  );
}

export default function AgendaView() {
  const [selected, setSelected] = useState<AgendaSlot | null>(null);

  const totalTalks = useMemo(() => agendaSummary.talks, []);

  return (
    <>
      <section className="w-full py-16 sm:py-20 text-white px-4 sm:px-6 bg-radial-[at_50%_10%] from-sky-900 via-slate-900 to-gray-950 to-80%">
        <div className="max-w-6xl mx-auto relative">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mb-4 z-10 relative text-shadow-lg drop-shadow-[0_0_4px_white]">
            Programación FLISoL 2026
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-medium text-center text-slate-200 mb-2 z-10 relative px-2">
            7 de mayo · Auditorio Jorge Roa Martínez — UTP
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-center text-slate-400 mb-10 sm:mb-12 z-10 relative">
            {totalTalks} charlas · Evento: {agendaSummary.startTime} –{" "}
            {agendaSummary.endTime} · Descanso: {agendaSummary.breakRange}
          </p>

          <div className="relative flex flex-col gap-8 lg:gap-10">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-amber-500 z-0 hidden lg:block" />

            {agenda2026.map((slot, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${slot.time}-${index}`}
                  className={`relative flex w-full items-center flex-col lg:flex-row lg:items-stretch ${
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-amber-500 rounded-full z-20 hidden lg:block" />

                  <time
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-[0_0_4px_white] mb-3 lg:mb-0 text-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 ${
                      isLeft
                        ? "lg:left-[calc(50%+1.5rem)] lg:text-left"
                        : "lg:right-[calc(50%+1.5rem)] lg:text-right"
                    }`}
                  >
                    {slot.time}
                  </time>

                  {slot.kind === "talk" ? (
                    <TalkCard slot={slot} onSelect={setSelected} />
                  ) : slot.kind === "break" ? (
                    <BreakCard slot={slot} />
                  ) : (
                    <LogisticsCard slot={slot} />
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-slate-500 mt-10 sm:mt-12 px-4">
            ★ Charlas con horario fijo. Entre charlas habrá espacios cortos para
            preguntas, logística de sala y presentación del siguiente ponente.
          </p>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 text-white px-4 sm:px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
            Nuestros ponentes
          </h2>
          <p className="text-center text-slate-400 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto px-2">
            Profesionales, comunidades y entusiastas del software libre que
            compartirán su experiencia este 7 de mayo.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {uniqueSpeakers.map((sp) => (
              <li
                key={sp.id}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-1"
              >
                <Image
                  src={sp.img || "/Flisol.svg"}
                  alt={`Foto de ${sp.name}`}
                  width={160}
                  height={160}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-amber-500 bg-slate-800 mb-4"
                />
                <p className="text-base sm:text-lg font-semibold text-white">
                  {sp.name}
                </p>
                {sp.handle && (
                  <p className="text-sm text-slate-400 mb-2">{sp.handle}</p>
                )}
                {sp.social && (
                  <a
                    href={sp.social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:underline text-sm mt-1"
                  >
                    <Github size={14} /> Ver perfil
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ModalAgenda2026 slot={selected} onClose={() => setSelected(null)} />
    </>
  );
}
