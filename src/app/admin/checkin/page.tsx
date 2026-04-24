"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { parseRegistrationIdFromQr } from "@/app/lib/checkinQr";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  { ssr: false },
);

type Registration = {
  id: string;
  name: string;
  email: string;
  githubUsername: string | null;
  ticketNumber: string;
  role: string;
  checkedIn: boolean;
  checkedInAt: string | null;
};

const ROLE_OPTIONS = [
  { value: "community", label: "Community" },
  { value: "speaker", label: "Ponente" },
  { value: "organizer", label: "Organizador" },
  { value: "staff", label: "Staff" },
] as const;

export default function AdminCheckinPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [manualQrInput, setManualQrInput] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [selectedRole, setSelectedRole] = useState("community");
  const lastScannedIdRef = useRef<string>("");

  const checkedInAtLabel = useMemo(() => {
    if (!registration?.checkedInAt) return "No registrada";
    return new Date(registration.checkedInAt).toLocaleString("es-CO");
  }, [registration?.checkedInAt]);

  const fetchRegistrationById = async (registrationId: string) => {
    setLookupLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/checkin?id=${encodeURIComponent(registrationId)}`,
        { method: "GET", cache: "no-store" },
      );

      const data = (await response.json()) as {
        error?: string;
        registration?: Registration;
      };

      if (!response.ok || !data.registration) {
        setRegistration(null);
        setError(data.error ?? "No fue posible consultar el asistente.");
        return;
      }

      setRegistration(data.registration);
      setSelectedRole(data.registration.role);
      setMessage(
        data.registration.checkedIn
          ? "Este asistente ya tenia asistencia marcada."
          : "Asistente encontrado. Puedes marcar asistencia.",
      );
    } catch {
      setRegistration(null);
      setError("Error de red al consultar el asistente.");
    } finally {
      setLookupLoading(false);
    }
  };

  const resolveAndFetchRegistration = async (rawQr: string) => {
    const registrationId = parseRegistrationIdFromQr(rawQr);
    if (!registrationId) {
      setError("QR invalido: no contiene un ID de registro valido.");
      setMessage("");
      setRegistration(null);
      return;
    }

    if (lastScannedIdRef.current === registrationId && registration) {
      return;
    }

    lastScannedIdRef.current = registrationId;
    await fetchRegistrationById(registrationId);
  };

  const handleScannerResult = async (result: unknown) => {
    if (!result) return;

    let rawValue = "";
    if (typeof result === "string") {
      rawValue = result;
    } else if (Array.isArray(result)) {
      const first = result[0] as { rawValue?: string } | undefined;
      rawValue = first?.rawValue ?? "";
    } else if (typeof result === "object" && result !== null) {
      const maybeCode = result as { rawValue?: string };
      rawValue = maybeCode.rawValue ?? "";
    }

    if (!rawValue) return;
    await resolveAndFetchRegistration(rawValue);
  };

  const handleManualLookup = async (event: FormEvent) => {
    event.preventDefault();
    await resolveAndFetchRegistration(manualQrInput);
  };

  const handleMarkCheckin = async () => {
    if (!registration) return;
    setMarkLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/checkin/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: registration.id, role: selectedRole }),
      });

      const data = (await response.json()) as {
        error?: string;
        alreadyCheckedIn?: boolean;
        registration?: Registration;
      };

      if (!response.ok || !data.registration) {
        setError(data.error ?? "No se pudo marcar asistencia.");
        return;
      }

      setRegistration(data.registration);
      setSelectedRole(data.registration.role);
      setMessage(
        data.alreadyCheckedIn
          ? "Asistencia ya estaba marcada previamente."
          : "Asistencia marcada correctamente.",
      );
    } catch {
      setError("Error de red al marcar asistencia.");
    } finally {
      setMarkLoading(false);
    }
  };

  return (
    <main className="px-6 py-8">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h1 className="mb-3 text-xl font-bold">Escaner QR</h1>

          <div className="overflow-hidden rounded-md border border-slate-700">
            <Scanner onScan={handleScannerResult} />
          </div>

          <form onSubmit={handleManualLookup} className="mt-4 space-y-2">
            <label className="block text-sm text-slate-300">
              Fallback manual (pega URL del QR o ID del registro)
            </label>
            <input
              type="text"
              value={manualQrInput}
              onChange={(event) => setManualQrInput(event.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 outline-none focus:border-orange-400"
              placeholder="https://.../admin/checkin?id=... o UUID"
            />
            <button
              type="submit"
              disabled={lookupLoading}
              className="rounded bg-blue-500 px-3 py-2 text-sm font-semibold hover:bg-blue-600 disabled:opacity-60"
            >
              {lookupLoading ? "Consultando..." : "Consultar"}
            </button>
          </form>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h2 className="mb-4 text-xl font-bold">Resultado</h2>

          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
          {message && <p className="mb-3 text-sm text-emerald-400">{message}</p>}

          {!registration ? (
            <p className="text-slate-300">
              Escanea un QR para ver la informacion del asistente.
            </p>
          ) : (
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold text-slate-300">Nombre:</span>{" "}
                {registration.name}
              </p>
              <p>
                <span className="font-semibold text-slate-300">Correo:</span>{" "}
                {registration.email}
              </p>
              <p>
                <span className="font-semibold text-slate-300">GitHub:</span>{" "}
                {registration.githubUsername || "No informado"}
              </p>
              <p>
                <span className="font-semibold text-slate-300">Ticket:</span>{" "}
                {registration.ticketNumber}
              </p>
              <div>
                <span className="font-semibold text-slate-300">Rol:</span>{" "}
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="ml-1 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm outline-none focus:border-orange-400"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <p>
                <span className="font-semibold text-slate-300">Estado:</span>{" "}
                {registration.checkedIn ? "Registrado" : "Pendiente"}
              </p>
              <p>
                <span className="font-semibold text-slate-300">
                  Hora de check-in:
                </span>{" "}
                {checkedInAtLabel}
              </p>

              <button
                type="button"
                onClick={handleMarkCheckin}
                disabled={registration.checkedIn || markLoading}
                className="mt-2 rounded bg-orange-500 px-4 py-2 font-semibold hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {markLoading ? "Guardando..." : "Marcar asistencia"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
