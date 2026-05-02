"use client";

import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminNav from "./AdminNav";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/session", { method: "GET", cache: "no-store" })
      .then((res) => res.json())
      .then((data: { authenticated?: boolean }) =>
        setAuthenticated(Boolean(data.authenticated)),
      )
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setAuthenticated(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-4 text-slate-300">
          Validando sesion...
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <>
      <AdminNav onLogout={handleLogout} />
      {children}
    </>
  );
}
