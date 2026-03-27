"use client";
import { useState } from "react";
import Ticket from "../ui/ticket";
import InputField from "../ui/inputFile";

type Errors = {
  name: boolean;
  email: boolean;
  dataConsent: boolean;
};

type Step = "form" | "ticket";

const isDev = process.env.NEXT_PUBLIC_APP_ENV === "development";

export default function Registry({ role = "community" }: { role?: string }) {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(isDev ? "Sebastian A" : "");
  const [email, setEmail] = useState(isDev ? "sebastian.agudelo2@utp.edu.co" : "");
  const [github, setGithub] = useState(isDev ? "SebastianAMo" : "");
  const [registrationRole, setRegistrationRole] = useState(role);
  const [dataConsent, setDataConsent] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    dataConsent: false,
  });

  const [ticketNumber, setTicketNumber] = useState<string>(
    () =>
      "#" +
      Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0"),
  );
  const [qrValue, setQrValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {
      name: name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      dataConsent: dataConsent !== true,
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      setLoading(false);
      return
    };

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          github,
          ticketNumber,
          role,
          dataConsent,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message =
          errorBody?.error ?? "Hubo un error al registrar. Intenta nuevamente.";
        alert(message);
        setLoading(false);
        return;
      }

      const result = await response.json();
      const registration = result.registration as {
        id: string;
        name: string;
        email: string;
        githubUsername?: string | null;
        ticketNumber: string;
        role: string;
        qrValue: string;
      };

      setName(registration.name);
      setEmail(registration.email);
      setTicketNumber(registration.ticketNumber);
      setGithub(registration.githubUsername ?? "");
      setRegistrationRole(registration.role);
      setQrValue(registration.qrValue);
      setStep("ticket");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error al registrar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-18 px-6 text-white">
      {step === "form" && (
        <section className="first-section max-w-lg mx-auto">
          <h1 className="text-4xl font-bold mb-4">Registro</h1>
          <p className="text-lg mb-8">
            ¡Bienvenido al{" "}
            <span className="font-bold text-orange-400">
              FLISoL Pereira 2026
            </span>
            ! 🎉
            <br />
            El Festival Latinoamericano de Instalación de Software Libre es el
            evento perfecto para conectar, aprender y compartir con entusiastas
            de la tecnología y el conocimiento libre.
            <br />
            Completa el siguiente formulario para asegurar tu entrada y recibir
            tu ticket personalizado.
          </p>
          <form id="form" onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="full-name"
              label="Nombre Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={errors.name}
              errorMessage="Nombre Completo requerido"
              placeholder="Ej: Juan"
            />
            <InputField
              id="email"
              type="email"
              label="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={errors.email}
              errorMessage="Por favor ingresa un correo electrónico válido"
              placeholder="Ej: juan@example.com"
            />

            <InputField
              id="github-username"
              label="Usuario de GitHub (Opcional)"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Ej: juandev"
            />
            <div className="space-y-2">
              <label className="flex items-start gap-3 select-none">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border border-white/20 bg-white/5 text-orange-500 focus:ring-2 focus:ring-orange-400"
                  checked={dataConsent}
                  onChange={(e) => setDataConsent(e.target.checked)}
                  required
                />
                <span className="text-sm text-white/90">
                  Acepto el tratamiento de mis datos personales conforme a la Ley
                  1581 de 2012 (Colombia) y autorizo su uso para la gestión del
                  evento.{" "}
                  <a
                    href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-300 hover:text-orange-200 underline underline-offset-2"
                  >
                    Ver norma
                  </a>
                  .
                </span>
              </label>
              {errors.dataConsent && (
                <p className="text-sm text-red-400">
                  Debes aceptar el tratamiento de datos para continuar.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !dataConsent}
              className={`w-full py-2 rounded transition text-white ${
                loading || !dataConsent
                  ? "bg-orange-900/40 cursor-not-allowed opacity-60"
                  : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
              }`}
            >
              {loading ? (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mr-2"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : null}
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </form>
        </section>
      )}

      {step === "ticket" && (
        <Ticket
          name={name}
          github={github}
          ticketNumber={ticketNumber}
          qrValue={qrValue}
          role={registrationRole}
        />
      )}
    </main>
  );
}