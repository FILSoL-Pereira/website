"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ATTENDEE_KEY = "flisol_attendee_id";

type Question = {
  id: string;
  text: string;
  options: string[];
  points: number;
};

type Talk = {
  id: string;
  title: string;
  speakerName: string;
  questions: Question[];
};

type AnswerResult = {
  correct: boolean;
  pointsEarned: number;
  totalPoints: number;
};

export default function QuizTalkPage() {
  const { talkId } = useParams<{ talkId: string }>();

  // Read localStorage lazily to avoid SSR issues and lint warnings
  const [attendeeId, setAttendeeId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ATTENDEE_KEY);
  });
  const [idInput, setIdInput] = useState("");
  const [idError, setIdError] = useState("");

  const [talk, setTalk] = useState<Talk | null>(null);
  const [talkError, setTalkError] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);

  const [sessionPoints, setSessionPoints] = useState(0);
  const [done, setDone] = useState(false);

  // Load talk once we have an attendee ID
  useEffect(() => {
    if (!attendeeId) return;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const r = await fetch(`/api/quiz/${talkId}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await r.json()) as { talk?: Talk; error?: string };
        if (data.error) {
          setTalkError(data.error);
        } else {
          setTalk(data.talk ?? null);
        }
      } catch {
        if (!controller.signal.aborted) setTalkError("Error al cargar la charla.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, [attendeeId, talkId]);

  async function handleSetId(e: FormEvent) {
    e.preventDefault();
    setIdError("");
    const input = idInput.trim();
    if (!input) return;

    const res = await fetch(
      `/api/registrations/by-ticket?number=${encodeURIComponent(input)}`,
      { cache: "no-store" },
    );
    const data = (await res.json()) as { id?: string; name?: string; error?: string };

    if (!res.ok || !data.id) {
      setIdError(data.error ?? "Ticket no encontrado. Verifica el número en tu badge.");
      return;
    }

    localStorage.setItem(ATTENDEE_KEY, data.id);
    setAttendeeId(data.id);
  }

  async function handleSubmitAnswer() {
    if (selectedOption === null || !talk || submitting) return;
    const question = talk.questions[currentIdx];
    if (!question) return;

    setSubmitting(true);
    const res = await fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendeeId, questionId: question.id, selectedOption }),
    });
    const data = (await res.json()) as AnswerResult & { error?: string };

    if (res.status === 409) {
      setAlreadyAnswered(true);
      setResult({ correct: false, pointsEarned: 0, totalPoints: sessionPoints });
    } else if (res.ok) {
      setResult(data);
      setSessionPoints(data.totalPoints);
    }
    setSubmitting(false);
  }

  function handleNext() {
    if (!talk) return;
    setSelectedOption(null);
    setResult(null);
    setAlreadyAnswered(false);
    if (currentIdx + 1 >= talk.questions.length) {
      setDone(true);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }

  // ─── No attendee ID yet ───────────────────────────────────────────────────
  if (!attendeeId) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <section className="mx-auto max-w-md rounded-lg border border-slate-700 bg-slate-900 p-6">
          <h1 className="mb-2 text-xl font-bold">Identificarte para el quiz</h1>
          <p className="mb-4 text-sm text-slate-400">
            Ingresa el número de ticket de tu badge (ej.{" "}
            <span className="font-mono text-slate-300">#01234</span>).
          </p>
          <form onSubmit={handleSetId} className="space-y-3">
            <input
              type="text"
              placeholder="#01234"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 font-mono text-sm outline-none focus:border-orange-400"
              required
            />
            <button
              type="submit"
              className="w-full rounded bg-orange-500 px-4 py-2 font-semibold hover:bg-orange-600"
            >
              Continuar
            </button>
          </form>
          {idError && <p className="mt-3 text-sm text-red-400">{idError}</p>}
        </section>
      </main>
    );
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-xl rounded-lg border border-slate-700 bg-slate-900 p-6">
          Cargando quiz...
        </div>
      </main>
    );
  }

  // ─── Error ────────────────────────────────────────────────────────────────
  if (talkError || !talk) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-xl rounded-lg border border-slate-700 bg-slate-900 p-6">
          <p className="text-red-400">{talkError || "Charla no encontrada."}</p>
          <Link href="/quiz" className="mt-4 inline-block text-sm text-orange-400 hover:text-orange-300">
            ← Volver a los quizzes
          </Link>
        </div>
      </main>
    );
  }

  // ─── Done ─────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md rounded-lg border border-slate-700 bg-slate-900 p-8 text-center"
        >
          <p className="mb-2 text-5xl">🎉</p>
          <h1 className="mb-3 text-2xl font-bold">¡Quiz completado!</h1>
          <p className="mb-1 text-slate-400">Puntos acumulados en total:</p>
          <p className="mb-6 text-4xl font-bold text-orange-400">{sessionPoints} pts</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/ranking"
              className="rounded bg-orange-500 px-4 py-2 font-semibold hover:bg-orange-600"
            >
              Ver ranking
            </Link>
            <Link
              href="/quiz"
              className="rounded border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Otros quizzes
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // ─── Quiz ─────────────────────────────────────────────────────────────────
  const question = talk.questions[currentIdx];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/quiz" className="text-sm text-slate-500 hover:text-slate-300">
            ← {talk.title}
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Pregunta {currentIdx + 1} / {talk.questions.length}
            </p>
            <p className="text-sm font-semibold text-orange-400">{sessionPoints} pts</p>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
            <div
              className="h-1.5 rounded-full bg-orange-500 transition-all"
              style={{ width: `${((currentIdx) / talk.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-slate-700 bg-slate-900 p-6"
          >
            <p className="mb-1 text-xs text-slate-500">{question.points} puntos</p>
            <h2 className="mb-6 text-lg font-semibold leading-snug">{question.text}</h2>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                let classes =
                  "w-full rounded-lg border px-4 py-3 text-left text-sm transition ";

                if (result || alreadyAnswered) {
                  // Show feedback after submission (we don't know correct, just if we were right)
                  if (i === selectedOption) {
                    classes += result?.correct
                      ? "border-emerald-500 bg-emerald-900/30 text-emerald-300"
                      : "border-red-500 bg-red-900/30 text-red-300";
                  } else {
                    classes += "border-slate-700 bg-slate-800/50 text-slate-500 cursor-default";
                  }
                } else if (selectedOption === i) {
                  classes += "border-orange-500 bg-orange-900/20 text-orange-300";
                } else {
                  classes += "border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-700";
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={result !== null || alreadyAnswered}
                    onClick={() => setSelectedOption(i)}
                    className={classes}
                  >
                    <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Result feedback */}
            <AnimatePresence>
              {(result || alreadyAnswered) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                    alreadyAnswered
                      ? "bg-slate-800 text-slate-300"
                      : result?.correct
                      ? "bg-emerald-900/30 text-emerald-300"
                      : "bg-red-900/30 text-red-300"
                  }`}
                >
                  {alreadyAnswered ? (
                    "Ya habías respondido esta pregunta."
                  ) : result?.correct ? (
                    <>¡Correcto! +{result.pointsEarned} puntos</>
                  ) : (
                    <>Incorrecto. Sin puntos esta vez.</>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-5 flex justify-end gap-3">
              {!result && !alreadyAnswered ? (
                <button
                  type="button"
                  disabled={selectedOption === null || submitting}
                  onClick={handleSubmitAnswer}
                  className="rounded bg-orange-500 px-5 py-2 font-semibold hover:bg-orange-600 disabled:opacity-50"
                >
                  {submitting ? "Enviando..." : "Responder"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded bg-slate-700 px-5 py-2 font-semibold hover:bg-slate-600"
                >
                  {currentIdx + 1 >= talk.questions.length ? "Ver resultados" : "Siguiente →"}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
