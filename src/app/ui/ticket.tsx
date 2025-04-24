"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas-pro";
import Link from "next/link";

export default function Ticket({
  name,
  github,
  ticketNumber,
}: {
  name: string;
  github: string;
  ticketNumber: string;
}) {
  const [avatarSrc, setAvatarSrc] = useState(
    `https://unavatar.io/github/${github}`
  );
  const ticketRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // Función para descargar como imagen PNG
  const downloadAsImage = async () => {
    if (!ticketRef.current) return;
    setLoading(true);
    const canvas = await html2canvas(ticketRef.current, { scale: 2 });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${ticketNumber.replace("#", "")}_ticket.png`;
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(dataUrl); // Liberar la URL del objeto después de descargar
    }, 100);
    setLoading(false);
  };

  return (
    <div className="text-center py-7">
      <h2 className="text-3xl font-bold mb-8 text-white p-3">
      ¡Gracias por registrarte, <span className="text-gradient">{name}</span>!<br />
      ¡Te esperamos con emoción en el evento! ✨
      </h2>


      <div
        ref={ticketRef}
        className="ticket rounded-lg overflow-hidden max-w-md mx-auto bg-cover bg-radial-[at_50%_10%] from-sky-900 via-slate-900 to-gray-950 to-80%"
        style={{
          backgroundImage:
            "url('/assets/images/pattern-ticket.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "30px",
        }}
      >
        <div className="p-4 flex justify-between items-start">
          <div>
            <Image
              src="/Flisol-Completo.svg"
              alt="logo"
              width={64}
              height={32}
            />
            <p className="text-sm text-gray-400 text-left">
              <span className="font-medium">8 de mayo</span> UTP / Pereira
            </p>
            <div className="flex items-center mt-4">
              <Image
                src={avatarSrc}
                alt="avatar"
                className="w-16 h-16 rounded mr-3"
                width={64}
                height={64}
                onError={() =>
                  setAvatarSrc("/assets/images/avatar-svgrepo-com.svg")
                }
              />
              <div className="text-left">
                <p className="text-lg text-gray-400 font-medium">{name}</p>
                <p className="flex items-center text-gray-400">
                  <Image
                    src="/assets/images/icon-github.svg"
                    alt="icon-github"
                    className="w-5 h-5 mr-1"
                    width={20}
                    height={20}
                  />
                  @{github}
                </p>
              </div>
            </div>
          </div>
          <p className="transform rotate-90 text-gray-400 font-mono text-xl">
            {ticketNumber}
          </p>
        </div>
      </div>

      <div className="mt-6 space-x-4 p-3">
        <p className="text-lg text-gray-400 mb-2">
          Descarga tu ticket para participar de las sorpresas 🎁
        </p>
        <p className="text-blue-400 underline hover:text-blue-300 mb-4">
          <Link
            href={
              "https://github.com/FILSoL-Pereira/.github/blob/main/AWARDS.md"
            }
            target="__blank"
          >
            Consulta aquí los términos y condiciones de participación
          </Link>
        </p>
        <button
          onClick={downloadAsImage}
          disabled={loading}
          className={`px-4 py-2 rounded transition bg-orange-500 hover:bg-orange-600 text-white`}
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
          {loading ? "Descargando..." : "Descargar Ticket"}
        </button>
      </div>
    </div>
  );
}
