"use client";
import { useState } from "react";
import Ticket from "../ui/ticket";
import InputField from "../ui/inputFile";

type Errors = {
  name: boolean;
  email: boolean;
};

type Step = "form" | "ticket";

export default function Registry() {
  // Sección activa: 'form' o 'ticket'
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);

  // Campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");

  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
  });

  const [ticketNumber, setTicketNumber] = useState<string>(
    () =>
      "#" +
      Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0"),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {
      name: name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
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
        name: string;
        email: string;
        githubUsername?: string | null;
        ticketNumber: string;
      };

      setName(registration.name);
      setEmail(registration.email);
      setTicketNumber(registration.ticketNumber);
      setGithub(registration.githubUsername ?? "");
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
              FLISoL Pereira 2025
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
              placeholder="Ej: Ana García"
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
              placeholder="Ej: ana@example.com"
            />

            <InputField
              id="github-username"
              label="Usuario de GitHub (Opcional)"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Ej: anagarcia"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded transition bg-orange-500 hover:bg-orange-600 text-white`}
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
        <Ticket name={name} github={github} ticketNumber={ticketNumber} />
      )}
    </main>
  );
}