"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Winner = {
  id: string;
  name: string;
  email: string;
  githubUsername: string | null;
  ticketNumber: string;
  role: string;
  totalPoints: number;
};

export default function AdminRafflePage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [totalEligible, setTotalEligible] = useState(0);
  const [error, setError] = useState("");
  const [minPoints, setMinPoints] = useState(1);

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { authenticated: boolean }) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  async function handleSpin() {
    setSpinning(true);
    setWinner(null);
    setError("");

    // Minimum animation time: 3s
    const [res] = await Promise.all([
      fetch("/api/admin/raffle/pick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minPoints }),
      }),
      new Promise((r) => setTimeout(r, 3000)),
    ]);

    const data = (await res.json()) as {
      winner?: Winner;
      totalEligible?: number;
      error?: string;
    };

    if (!res.ok) {
      setError(data.error ?? "Error al seleccionar ganador.");
    } else {
      setWinner(data.winner!);
      setTotalEligible(data.totalEligible ?? 0);
    }
    setSpinning(false);
  }

  if (authenticated === null) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-xl rounded-lg border border-slate-700 bg-slate-900 p-6">
          Validando sesión...
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-md rounded-lg border border-slate-700 bg-slate-900 p-6 text-center">
          <p className="mb-4 text-slate-400">Debes iniciar sesión como administrador.</p>
          <Link href="/admin/checkin" className="text-orange-400 hover:text-orange-300">
            Ir al check-in →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ruleta de Premios</h1>
          <Link
            href="/admin/talks"
            className="text-sm text-slate-400 hover:text-slate-200"
          >
            ← Charlas
          </Link>
        </div>

        {/* Config */}
        <div className="mb-6 flex items-center gap-3 text-sm text-slate-400">
          <label htmlFor="minPoints">Puntos mínimos para participar:</label>
          <input
            id="minPoints"
            type="number"
            min={1}
            value={minPoints}
            onChange={(e) => setMinPoints(Math.max(1, Number(e.target.value)))}
            className="w-20 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-white outline-none focus:border-orange-400"
          />
        </div>

        {/* Spin area */}
        <div className="flex flex-col items-center gap-8 rounded-lg border border-slate-700 bg-slate-900 px-6 py-10">
          {/* Spinning wheel */}
          <motion.div
            animate={spinning ? { rotate: [0, 360 * 8] } : { rotate: 0 }}
            transition={
              spinning
                ? { duration: 3, ease: [0.2, 0.8, 0.8, 1] }
                : { duration: 0 }
            }
            className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-orange-500 bg-slate-800 text-5xl"
          >
            🎰
          </motion.div>

          <button
            type="button"
            onClick={handleSpin}
            disabled={spinning}
            className="rounded-lg bg-orange-500 px-8 py-3 text-lg font-bold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {spinning ? "Girando..." : winner ? "Girar de nuevo" : "Girar ruleta"}
          </button>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Winner reveal */}
          <AnimatePresence>
            {winner && !spinning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="w-full rounded-xl border border-orange-500/50 bg-slate-800 p-6 text-center"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-400">
                  Ganador · {totalEligible} participante{totalEligible !== 1 ? "s" : ""} elegibles
                </p>

                {winner.githubUsername ? (
                  <Image
                    src={`https://unavatar.io/github/${winner.githubUsername}`}
                    alt={winner.name}
                    width={80}
                    height={80}
                    className="mx-auto mb-3 rounded-full ring-2 ring-orange-500"
                    unoptimized
                  />
                ) : (
                  <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 text-2xl font-bold ring-2 ring-orange-500">
                    {winner.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <h2 className="mb-1 text-2xl font-bold">{winner.name}</h2>
                {winner.githubUsername && (
                  <p className="mb-1 text-sm text-slate-400">@{winner.githubUsername}</p>
                )}
                <p className="mb-1 text-sm text-slate-400">{winner.email}</p>
                <p className="mb-3 text-xs text-slate-500">Ticket {winner.ticketNumber}</p>
                <p className="text-3xl font-bold text-orange-400">{winner.totalPoints} pts</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
