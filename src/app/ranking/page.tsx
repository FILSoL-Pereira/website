"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type RankEntry = {
  rank: number;
  attendeeId: string;
  name: string;
  githubUsername: string | null;
  totalPoints: number;
};

type TalkTab = {
  id: string;
  title: string;
  speakerName: string;
};

const MEDAL = ["🥇", "🥈", "🥉"];

function RankingList({ ranking, loading }: { ranking: RankEntry[]; loading: boolean }) {
  if (loading) return <p className="text-slate-400">Cargando ranking...</p>;

  if (ranking.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 text-center text-slate-400">
        Aún no hay puntuaciones. ¡Sé el primero!
        <br />
        <Link href="/quiz" className="mt-4 inline-block text-sm text-orange-400 hover:text-orange-300">
          Ir a los quizzes →
        </Link>
      </div>
    );
  }

  return (
    <ol className="space-y-3">
      {ranking.map((entry, idx) => (
        <motion.li
          key={entry.attendeeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04 }}
          className={`flex items-center gap-4 rounded-lg border px-4 py-3 ${
            entry.rank === 1
              ? "border-yellow-500/50 bg-yellow-900/10"
              : entry.rank === 2
              ? "border-slate-400/40 bg-slate-800/40"
              : entry.rank === 3
              ? "border-amber-700/40 bg-amber-900/10"
              : "border-slate-700 bg-slate-900"
          }`}
        >
          <div className="w-8 shrink-0 text-center">
            {entry.rank <= 3 ? (
              <span className="text-2xl">{MEDAL[entry.rank - 1]}</span>
            ) : (
              <span className="text-sm font-bold text-slate-500">#{entry.rank}</span>
            )}
          </div>

          {entry.githubUsername ? (
            <Image
              src={`https://unavatar.io/github/${entry.githubUsername}`}
              alt={entry.name}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-slate-300">
              {entry.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="truncate font-semibold">{entry.name}</p>
            {entry.githubUsername && (
              <p className="truncate text-xs text-slate-500">@{entry.githubUsername}</p>
            )}
          </div>

          <div className="shrink-0 text-right">
            <p className="font-bold text-orange-400">{entry.totalPoints}</p>
            <p className="text-xs text-slate-500">pts</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export default function RankingPage() {
  const [talks, setTalks] = useState<TalkTab[]>([]);
  const [activeTab, setActiveTab] = useState<"global" | string>("global");
  const [ranking, setRanking] = useState<RankEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quiz", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { talks?: TalkTab[] }) => setTalks(data.talks ?? []))
      .catch(() => setTalks([]));
  }, []);

  useEffect(() => {
    const url = activeTab === "global" ? "/api/ranking" : `/api/ranking?talkId=${activeTab}`;
    async function load() {
      setLoading(true);
      try {
        const r = await fetch(url, { cache: "no-store" });
        const data = (await r.json()) as { ranking?: RankEntry[] };
        setRanking(data.ranking ?? []);
      } catch {
        setRanking([]);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Ranking</h1>
        <p className="mb-6 text-slate-400">
          Top participantes por puntos acumulados en los quizzes.
        </p>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("global")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              activeTab === "global"
                ? "bg-orange-500 text-white"
                : "border border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200"
            }`}
          >
            🌍 Global
          </button>
          {talks.map((talk) => (
            <button
              key={talk.id}
              type="button"
              onClick={() => setActiveTab(talk.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                activeTab === talk.id
                  ? "bg-orange-500 text-white"
                  : "border border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200"
              }`}
            >
              {talk.title}
            </button>
          ))}
        </div>

        {activeTab !== "global" && (
          <p className="mb-4 text-xs text-slate-500">
            Mostrando puntos obtenidos solo en esta charla.
          </p>
        )}

        <RankingList ranking={ranking} loading={loading} />

        <div className="mt-8">
          <Link href="/quiz" className="text-sm text-orange-400 hover:text-orange-300">
            ← Volver a los quizzes
          </Link>
        </div>
      </div>
    </main>
  );
}
