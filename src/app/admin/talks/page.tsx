"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Talk = {
  id: string;
  title: string;
  isOpen: boolean;
  speakerName: string;
  questionCount: number;
};

export default function AdminTalksPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [talks, setTalks] = useState<Talk[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      const data = (await res.json()) as { authenticated: boolean };
      setAuthenticated(data.authenticated);
    };
    checkSession().catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/admin/talks", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { talks?: Talk[] }) => setTalks(data.talks ?? []))
      .catch(() => setTalks([]))
      .finally(() => setLoading(false));
  }, [authenticated]);

  async function handleToggle(talk: Talk) {
    setToggling(talk.id);
    setMessage("");
    const res = await fetch(`/api/admin/talks/${talk.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOpen: !talk.isOpen }),
    });
    const data = (await res.json()) as { talk?: Talk; error?: string };

    if (res.ok && data.talk) {
      setTalks((prev) => prev.map((t) => (t.id === talk.id ? data.talk! : t)));
      setMessage(`"${data.talk.title}" ahora está ${data.talk.isOpen ? "abierta" : "cerrada"}.`);
    }
    setToggling(null);
  }

  if (authenticated === null || loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-2xl rounded-lg border border-slate-700 bg-slate-900 p-6">
          Cargando...
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
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestión de Charlas</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/raffle"
              className="rounded border border-slate-600 px-3 py-1.5 text-sm hover:bg-slate-800"
            >
              Ruleta
            </Link>
            <Link
              href="/admin/checkin"
              className="rounded border border-slate-600 px-3 py-1.5 text-sm hover:bg-slate-800"
            >
              Check-in
            </Link>
          </div>
        </div>

        {message && <p className="mb-4 text-sm text-emerald-400">{message}</p>}

        {talks.length === 0 ? (
          <p className="text-slate-400">No hay charlas registradas aún.</p>
        ) : (
          <div className="space-y-3">
            {talks.map((talk) => (
              <div
                key={talk.id}
                className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{talk.title}</p>
                  <p className="text-xs text-slate-500">
                    {talk.speakerName} · {talk.questionCount} pregunta{talk.questionCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle(talk)}
                  disabled={toggling === talk.id}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition disabled:opacity-60 ${
                    talk.isOpen
                      ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                  }`}
                >
                  {toggling === talk.id ? "..." : talk.isOpen ? "Cerrar" : "Abrir"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
