"use client";

import { FormEvent, useState } from "react";

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "No fue posible iniciar sesion.");
        return;
      }

      onSuccess();
    } catch {
      setError("Error de red al iniciar sesion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h1 className="mb-4 text-2xl font-bold">Admin</h1>
        <p className="mb-6 text-sm text-slate-300">
          Inicia sesion para acceder al panel de administracion.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
          <input
            type="password"
            placeholder="Contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </section>
    </main>
  );
}
