"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type TalkSummary = {
  id: string;
  title: string;
  speakerName: string;
  speakerGithub: string | null;
  questionCount: number;
};

export default function QuizPage() {
  const [talks, setTalks] = useState<TalkSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quiz", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { talks?: TalkSummary[] }) => {
        setTalks(data.talks ?? []);
      })
      .catch(() => setTalks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">Quizzes de Charlas</h1>
        <p className="mb-8 text-slate-400">
          Responde las preguntas de cada charla y acumula puntos.
        </p>

        {loading && (
          <p className="text-slate-400">Cargando charlas disponibles...</p>
        )}

        {!loading && talks.length === 0 && (
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 text-center">
            <p className="text-slate-400">
              No hay quizzes disponibles en este momento.
              <br />
              Vuelve durante las charlas.
            </p>
          </div>
        )}

        {!loading && talks.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {talks.map((talk) => (
              <Link
                key={talk.id}
                href={`/quiz/${talk.id}`}
                className="group rounded-lg border border-slate-700 bg-slate-900 p-5 transition hover:border-orange-500 hover:bg-slate-800"
              >
                <div className="mb-3 flex items-center gap-3">
                  {talk.speakerGithub && (
                    <Image
                      src={`https://unavatar.io/github/${talk.speakerGithub}`}
                      alt={talk.speakerName}
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                    />
                  )}
                  <div>
                    <p className="text-xs text-slate-400">Ponente</p>
                    <p className="text-sm font-medium">{talk.speakerName}</p>
                  </div>
                </div>
                <h2 className="mb-2 font-semibold group-hover:text-orange-400">
                  {talk.title}
                </h2>
                <p className="text-xs text-slate-500">
                  {talk.questionCount} pregunta{talk.questionCount !== 1 ? "s" : ""}
                </p>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
