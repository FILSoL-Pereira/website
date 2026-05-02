"use client";

import { FormEvent, useEffect, useState } from "react";


type Talk = {
  id: string;
  title: string;
  isOpen: boolean;
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

type TalkWithQuestions = Talk & { questions: Question[] };

export default function SpeakerPortalPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [speakerName, setSpeakerName] = useState("");
  const [loginInput, setLoginInput] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [talks, setTalks] = useState<Talk[]>([]);
  const [expandedTalk, setExpandedTalk] = useState<TalkWithQuestions | null>(null);
  const [newTalkTitle, setNewTalkTitle] = useState("");
  const [talkLoading, setTalkLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // New question form state
  const [qText, setQText] = useState("");
  const [qOptions, setQOptions] = useState(["", "", "", ""]);
  const [qCorrect, setQCorrect] = useState(0);
  const [qPoints, setQPoints] = useState(10);
  const [qLoading, setQLoading] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch("/api/speaker/session", { cache: "no-store" });
        const data = (await res.json()) as { authenticated: boolean };
        setAuthenticated(data.authenticated);
        if (data.authenticated) {
          const talksRes = await fetch("/api/speaker/talks", { cache: "no-store" });
          const talksData = (await talksRes.json()) as { talks: Talk[] };
          setTalks(talksData.talks ?? []);
        }
      } catch {
        setAuthenticated(false);
      }
    }
    void init();
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const ticketNumber = loginInput.trim();
    if (!ticketNumber) {
      setLoginError("Ingresa el número de tu ticket.");
      setLoginLoading(false);
      return;
    }

    // Look up registration by ticket number first
    const lookupRes = await fetch(
      `/api/registrations/by-ticket?number=${encodeURIComponent(ticketNumber)}`,
      { cache: "no-store" },
    );
    const lookupData = (await lookupRes.json()) as { id?: string; role?: string; error?: string };

    if (!lookupRes.ok || !lookupData.id) {
      setLoginError(lookupData.error ?? "Ticket no encontrado.");
      setLoginLoading(false);
      return;
    }

    if (lookupData.role !== "speaker") {
      setLoginError("Este ticket no corresponde a un ponente.");
      setLoginLoading(false);
      return;
    }

    const res = await fetch("/api/speaker/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId: lookupData.id }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string; name?: string };

    if (!res.ok) {
      setLoginError(data.error ?? "No fue posible iniciar sesión.");
      setLoginLoading(false);
      return;
    }

    setSpeakerName(data.name ?? "");
    setAuthenticated(true);
    setLoginLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/speaker/logout", { method: "POST" });
    setAuthenticated(false);
    setTalks([]);
    setExpandedTalk(null);
  }

  async function handleCreateTalk(e: FormEvent) {
    e.preventDefault();
    if (!newTalkTitle.trim()) return;
    setTalkLoading(true);
    setError("");
    setMessage("");

    const res = await fetch("/api/speaker/talks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTalkTitle.trim() }),
    });
    const data = (await res.json()) as { talk?: Talk; error?: string };

    if (!res.ok) {
      setError(data.error ?? "Error al crear charla.");
    } else {
      setTalks((prev) => [...prev, data.talk!]);
      setNewTalkTitle("");
      setMessage("Charla creada.");
    }
    setTalkLoading(false);
  }

  async function handleExpandTalk(talk: Talk) {
    if (expandedTalk?.id === talk.id) {
      setExpandedTalk(null);
      return;
    }
    const res = await fetch(`/api/speaker/talks/${talk.id}/questions`, { cache: "no-store" });
    const data = (await res.json()) as { questions?: Question[] };
    setExpandedTalk({ ...talk, questions: data.questions ?? [] });
  }

  async function handleAddQuestion(e: FormEvent) {
    e.preventDefault();
    if (!expandedTalk) return;
    setQLoading(true);
    setError("");
    setMessage("");

    const filledOptions = qOptions.filter((o) => o.trim());
    if (filledOptions.length < 2) {
      setError("Completa al menos 2 opciones.");
      setQLoading(false);
      return;
    }
    if (qCorrect >= filledOptions.length) {
      setError("Selecciona una opción correcta válida.");
      setQLoading(false);
      return;
    }

    const res = await fetch(`/api/speaker/talks/${expandedTalk.id}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: qText.trim(),
        options: filledOptions,
        correctOption: qCorrect,
        points: qPoints,
        order: expandedTalk.questions.length,
      }),
    });
    const data = (await res.json()) as { question?: Question; error?: string };

    if (!res.ok) {
      setError(data.error ?? "Error al agregar pregunta.");
    } else {
      setExpandedTalk((prev) =>
        prev ? { ...prev, questions: [...prev.questions, data.question!] } : prev,
      );
      setTalks((prev) =>
        prev.map((t) =>
          t.id === expandedTalk.id ? { ...t, questionCount: t.questionCount + 1 } : t,
        ),
      );
      setQText("");
      setQOptions(["", "", "", ""]);
      setQCorrect(0);
      setQPoints(10);
      setMessage("Pregunta agregada.");
    }
    setQLoading(false);
  }

  async function handleDeleteQuestion(questionId: string) {
    if (!expandedTalk) return;
    const res = await fetch(
      `/api/speaker/talks/${expandedTalk.id}/questions/${questionId}`,
      { method: "DELETE" },
    );
    if (res.ok) {
      setExpandedTalk((prev) =>
        prev ? { ...prev, questions: prev.questions.filter((q) => q.id !== questionId) } : prev,
      );
      setTalks((prev) =>
        prev.map((t) =>
          t.id === expandedTalk.id ? { ...t, questionCount: Math.max(0, t.questionCount - 1) } : t,
        ),
      );
      setMessage("Pregunta eliminada.");
    }
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (authenticated === null) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-xl rounded-lg border border-slate-700 bg-slate-900 p-6">
          Validando sesión...
        </div>
      </main>
    );
  }

  // ─── Login ────────────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <section className="mx-auto max-w-md rounded-lg border border-slate-700 bg-slate-900 p-6">
          <h1 className="mb-2 text-2xl font-bold">Portal de Ponente</h1>
          <p className="mb-6 text-sm text-slate-400">
            Ingresa el número de ticket de tu badge (ej.{" "}
            <span className="font-mono text-slate-300">#01234</span>).
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="#01234"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 font-mono text-sm outline-none focus:border-orange-400"
              required
            />
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded bg-orange-500 px-4 py-2 font-semibold transition hover:bg-orange-600 disabled:opacity-60"
            >
              {loginLoading ? "Verificando..." : "Acceder"}
            </button>
          </form>
          {loginError && <p className="mt-4 text-sm text-red-400">{loginError}</p>}
        </section>
      </main>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Portal de Ponente</h1>
            {speakerName && (
              <p className="text-sm text-slate-400">Hola, {speakerName}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded border border-slate-600 px-3 py-1 text-sm hover:bg-slate-800"
          >
            Salir
          </button>
        </div>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        {message && <p className="mb-4 text-sm text-emerald-400">{message}</p>}

        {/* New Talk */}
        <section className="mb-6 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h2 className="mb-3 font-semibold">Nueva charla</h2>
          <form onSubmit={handleCreateTalk} className="flex gap-2">
            <input
              type="text"
              placeholder="Título de la charla"
              value={newTalkTitle}
              onChange={(e) => setNewTalkTitle(e.target.value)}
              className="flex-1 rounded border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-400"
              required
            />
            <button
              type="submit"
              disabled={talkLoading}
              className="rounded bg-orange-500 px-4 py-2 text-sm font-semibold hover:bg-orange-600 disabled:opacity-60"
            >
              {talkLoading ? "Creando..." : "Crear"}
            </button>
          </form>
        </section>

        {/* Talks list */}
        {talks.length === 0 ? (
          <p className="text-slate-400">Aún no tienes charlas. Crea una arriba.</p>
        ) : (
          <div className="space-y-4">
            {talks.map((talk) => (
              <div
                key={talk.id}
                className="rounded-lg border border-slate-700 bg-slate-900"
              >
                {/* Talk header */}
                <button
                  type="button"
                  onClick={() => handleExpandTalk(talk)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-800/50"
                >
                  <span className="font-medium">{talk.title}</span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-400">
                      {talk.questionCount} pregunta{talk.questionCount !== 1 ? "s" : ""}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        talk.isOpen
                          ? "bg-emerald-900 text-emerald-300"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {talk.isOpen ? "Abierta" : "Cerrada"}
                    </span>
                    <span className="text-slate-500">
                      {expandedTalk?.id === talk.id ? "▲" : "▼"}
                    </span>
                  </div>
                </button>

                {/* Expanded questions + form */}
                {expandedTalk?.id === talk.id && (
                  <div className="border-t border-slate-700 px-4 py-4 space-y-4">
                    {/* Existing questions */}
                    {expandedTalk.questions.length === 0 ? (
                      <p className="text-sm text-slate-400">Sin preguntas todavía.</p>
                    ) : (
                      <ul className="space-y-3">
                        {expandedTalk.questions.map((q, idx) => (
                          <li
                            key={q.id}
                            className="rounded border border-slate-700 bg-slate-800 p-3 text-sm"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium">
                                {idx + 1}. {q.text}
                              </p>
                              <button
                                type="button"
                                onClick={() => handleDeleteQuestion(q.id)}
                                className="shrink-0 rounded px-2 py-0.5 text-xs text-red-400 hover:bg-red-900/30"
                              >
                                Eliminar
                              </button>
                            </div>
                            <ul className="mt-2 space-y-1 text-slate-400">
                              {q.options.map((opt, i) => (
                                <li key={i} className={i === q.correctOption ? "text-emerald-400" : ""}>
                                  {String.fromCharCode(65 + i)}. {opt}
                                  {i === q.correctOption && " ✓"}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-1 text-xs text-slate-500">{q.points} pts</p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Add question form */}
                    <form onSubmit={handleAddQuestion} className="space-y-3 border-t border-slate-700 pt-4">
                      <h3 className="text-sm font-semibold text-slate-300">Agregar pregunta</h3>
                      <textarea
                        placeholder="Texto de la pregunta"
                        value={qText}
                        onChange={(e) => setQText(e.target.value)}
                        rows={2}
                        className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-400"
                        required
                      />
                      <div className="space-y-2">
                        {qOptions.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="correctOption"
                              checked={qCorrect === i}
                              onChange={() => setQCorrect(i)}
                              className="accent-orange-500"
                              title={`Marcar opción ${String.fromCharCode(65 + i)} como correcta`}
                            />
                            <input
                              type="text"
                              placeholder={`Opción ${String.fromCharCode(65 + i)}`}
                              value={opt}
                              onChange={(e) => {
                                const next = [...qOptions];
                                next[i] = e.target.value;
                                setQOptions(next);
                              }}
                              className="flex-1 rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm outline-none focus:border-orange-400"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">Marca el radio de la opción correcta.</p>
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-slate-400">Puntos:</label>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={qPoints}
                          onChange={(e) => setQPoints(Number(e.target.value))}
                          className="w-20 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm outline-none focus:border-orange-400"
                        />
                        <button
                          type="submit"
                          disabled={qLoading}
                          className="ml-auto rounded bg-orange-500 px-4 py-1.5 text-sm font-semibold hover:bg-orange-600 disabled:opacity-60"
                        >
                          {qLoading ? "Guardando..." : "Agregar pregunta"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
