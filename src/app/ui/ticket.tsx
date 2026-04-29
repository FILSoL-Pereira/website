"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas-pro";
import Image from "next/image";

const BOOT_LINES = [
  "Initializing FLISOL kernel...",
  "Loading open source modules...",
  "Connecting to community network...",
  "Mounting /dev/knowledge...",
  "Access granted. Welcome, comrade.",
];

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const start = () => {
      const tick = () => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i < text.length) {
          timeout = setTimeout(tick, 28);
        } else {
          setDone(true);
        }
      };
      timeout = setTimeout(tick, delay);
    };

    start();
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-[7px] h-[14px] bg-orange-400 animate-pulse align-middle ml-[1px]" />
      )}
    </span>
  );
}

function BootSequence({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let current = 0;
    const advance = () => {
      current++;
      setVisibleLines(current);
      if (current < BOOT_LINES.length) {
        setTimeout(advance, 700);
      } else {
        setTimeout(onDone, 400);
      }
    };
    setTimeout(advance, 300);
  }, [onDone]);

  return (
    <div className="font-mono text-orange-400 text-xs sm:text-sm space-y-1 px-1">
      {BOOT_LINES.slice(0, visibleLines).map((line, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-orange-600 mr-2">{">"}</span>
          {line}
        </motion.p>
      ))}
    </div>
  );
}

const ROLE_LABELS: Record<string, string> = {
  community: "Community",
  speaker: "Ponente",
  organizer: "Organizador",
  staff: "Staff",
};

export default function Ticket({
  name,
  github,
  ticketNumber,
  qrValue,
  role = "community",
}: {
  name: string;
  github: string;
  ticketNumber: string;
  qrValue: string;
  role?: string;
}) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [booted, setBooted] = useState(false);

  const hasGithub = github.trim() !== "";
  const [avatarSrc, setAvatarSrc] = useState(
    hasGithub
      ? `https://unavatar.io/github/${github}`
      : "",
  );

  const displayName = name || "anonymous";
  const displayGithub = github ? `@${github}` : "no-github";

  const downloadAsImage = async () => {
    if (!ticketRef.current) return;
    setLoading(true);
    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
      backgroundColor: "#0a0f0a",
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${ticketNumber.replace("#", "")}_flisol_badge.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(dataUrl), 100);
    setLoading(false);
  };

  return (
    <div className="py-6 sm:py-8 px-3 sm:px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white font-mono break-words"
      >
        <span className="text-orange-400">{">"}</span>{" "}
        <span className="text-orange-300">Access granted,</span>{" "}
        <span className="text-orange-400">{displayName}</span>
        <span className="text-orange-300">.</span>
      </motion.h2>

      {/* ——— Badge card (capturado con html2canvas) ——— */}
      <motion.div
        ref={ticketRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative mx-auto w-full max-w-sm sm:max-w-md rounded-lg border border-orange-500 bg-[#0a0f0a] overflow-hidden shadow-[0_0_32px_rgba(249,115,22,0.2)]"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        {/* ——— scanline overlay ——— */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
          }}
        />

        {/* ——— title bar ——— */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-orange-700 bg-[#0d130d] px-3 sm:px-4 py-2">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500 opacity-80" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400 opacity-80" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500 opacity-80" />
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-orange-500 tracking-widest select-none">
            root@flisol:~#
          </span>
        </div>

        {/* ——— body ——— */}
        <div className="p-3 sm:p-5">
          {/* boot sequence */}
          <AnimatePresence>
            {!booted && (
              <motion.div
                key="boot"
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
              >
                <BootSequence onDone={() => setBooted(true)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* badge content after boot */}
          <AnimatePresence>
            {booted && (
              <motion.div
                key="badge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center min-[380px]:flex-row min-[380px]:items-start min-[380px]:justify-between gap-3 sm:gap-4"
              >
                {/* left: terminal info */}
                <div className="w-full min-[380px]:flex-1 min-w-0 text-left space-y-2 text-sm">
                  {/* prompt header */}
                  <p className="text-orange-500 font-bold tracking-wider mb-2 sm:mb-3 text-xs sm:text-sm">
                    root@flisol:~#{" "}
                    <span className="text-orange-300 font-normal">
                      cat badge.txt
                    </span>
                  </p>

                  <p className="text-orange-600 text-[10px] sm:text-xs truncate">
                    ─────────────────────────
                  </p>

                  <div className="space-y-1">
                    <p className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest">
                      USER
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3">
                      {hasGithub && avatarSrc && (
                        <Image
                          src={avatarSrc}
                          alt={`${github} avatar`}
                          width={56}
                          height={56}
                          className="w-9 h-9 sm:w-14 sm:h-14 rounded border border-orange-600 flex-shrink-0"
                          onError={() =>
                            setAvatarSrc("/assets/images/avatar-svgrepo-com.svg")
                          }
                        />
                      )}
                      <p className="text-white font-bold text-sm sm:text-lg break-words min-w-0">
                        <TypingText text={displayName} delay={80} />
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest">
                      GITHUB
                    </p>
                    <p className="text-orange-300 text-xs sm:text-sm break-all">
                      <TypingText text={displayGithub} delay={400} />
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest">
                      ACCESS
                    </p>
                    <p className="text-orange-400 text-xs sm:text-sm">
                      <TypingText text={ROLE_LABELS[role] ?? role} delay={720} />
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest">
                      EVENT
                    </p>
                    <p className="text-orange-200 text-xs sm:text-sm">
                      <TypingText text="FLISOL Pereira · 7 mayo" delay={1000} />
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-orange-500 text-[10px] sm:text-xs uppercase tracking-widest">
                      LOCATION
                    </p>
                    <p className="text-orange-200 text-xs sm:text-sm">
                      <TypingText
                        text="Auditorio Jorge Roa Martínez, UTP"
                        delay={1220}
                      />
                    </p>
                  </div>

                  <p className="text-orange-600 text-[10px] sm:text-xs truncate">
                    ─────────────────────────
                  </p>

                  <p className="text-orange-700 text-[10px] sm:text-xs font-mono">
                    TICKET: {ticketNumber}
                  </p>
                </div>

                {/* right: QR */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="rounded border border-orange-500 bg-white p-1.5 sm:p-2 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                    <QRCode
                      value={qrValue || "https://flisol.org"}
                      size={96}
                      className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]"
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  <p className="text-orange-600 text-[10px] tracking-widest">
                    SCAN ME
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ——— footer bar ——— */}
        <div className="border-t border-orange-800 bg-[#0d130d] px-2 sm:px-4 py-2 flex items-center justify-between gap-2">
          <Image
            src="/Flisol-Completo.svg"
            alt="FLISOL logo"
            width={64}
            height={64}
            className="h-5 sm:h-6 w-auto opacity-70 flex-shrink-0"
          />
          <span className="text-orange-700 text-[9px] sm:text-[10px] tracking-widest font-mono truncate">
            flisol.pereira · 2026
          </span>
          <span className="text-orange-500 text-[10px] font-mono animate-pulse flex-shrink-0">
            █
          </span>
        </div>
      </motion.div>

      {/* ——— actions ——— */}
      <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 p-2 sm:p-3">
        <p className="text-orange-400 font-mono text-xs sm:text-sm">
          <span className="text-orange-600">{">"}</span> Descarga tu badge para participar de las sorpresas 🎁
        </p>

        <button
          onClick={downloadAsImage}
          disabled={loading}
          className="px-4 sm:px-6 py-2 rounded border border-orange-500 font-mono font-bold text-xs sm:text-base text-orange-400 bg-transparent hover:bg-orange-900/40 hover:text-orange-300 transition disabled:opacity-50"
        >
          {loading ? "Procesando..." : "./descargar_badge.sh"}
        </button>


      </div>
    </div>
  );
}
