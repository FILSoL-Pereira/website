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

type Question = {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  points: number;
  order: number;
};

type ExpandedTalk = {
  talkId: string;
  questions: Question[];
  loading: boolean;
};

export default function AdminTalksPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [talks, setTalks] = useState<Talk[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState<ExpandedTalk | null>(null);

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

  async function handleExpand(talk: Talk) {
    if (expanded?.talkId === talk.id) {
      setExpanded(null);
      return;
    }
    setExpanded({ talkId: talk.id, questions: [], loading: true });
    try {
      const res = await fetch(`/api/admin/talks/${talk.id}/questions`, {
        cache: "no-store",
      });
      const data = (await res.json()) as { questions?: Question[] };
      setExpanded({
        talkId: talk.id,
        questions: data.questions ?? [],
        loading: false,
      });
    } catch {
      setExpanded({ talkId: talk.id, questions: [], loading: false });
    }
  }

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
            {talks.map((talk) => {
              const isExpanded = expanded?.talkId === talk.id;
              return (
                <div
                  key={talk.id}
                  className="rounded-lg border border-slate-700 bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleExpand(talk)}
                      className="flex-1 text-left"
                    >
                      <p className="font-medium">{talk.title}</p>
                      <p className="text-xs text-slate-500">
                        {talk.speakerName} · {talk.questionCount} pregunta
                        {talk.questionCount !== 1 ? "s" : ""}
                        <span className="ml-2 text-slate-600">
                          {isExpanded ? "▲" : "▼"}
                        </span>
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggle(talk)}
                      disabled={toggling === talk.id}
                      className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition disabled:opacity-60 ${
                        talk.isOpen
                          ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                      }`}
                    >
                      {toggling === talk.id
                        ? "..."
                        : talk.isOpen
                          ? "Cerrar"
                          : "Abrir"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-700 px-4 py-4">
                      {expanded.loading ? (
                        <p className="text-sm text-slate-400">Cargando preguntas...</p>
                      ) : expanded.questions.length === 0 ? (
                        <p className="text-sm text-slate-400">
                          Sin preguntas todavía.
                        </p>
                      ) : (
                        <ul className="space-y-3">
                          {expanded.questions.map((q, idx) => (
                            <li
                              key={q.id}
                              className="rounded border border-slate-700 bg-slate-800 p-3 text-sm"
                            >
                              <p className="font-medium">
                                {idx + 1}. {q.text}
                              </p>
                              <ul className="mt-2 space-y-1 text-slate-400">
                                {q.options.map((opt, i) => (
                                  <li
                                    key={i}
                                    className={
                                      i === q.correctOption ? "text-emerald-400" : ""
                                    }
                                  >
                                    {String.fromCharCode(65 + i)}. {opt}
                                    {i === q.correctOption && " ✓"}
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-1 text-xs text-slate-500">
                                {q.points} pts
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
