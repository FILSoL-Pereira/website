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
        ¡Gracias por registrarte, <span className="text-gradient">{name}</span>!
        <br />
        ¡Te esperamos con emoción en el evento! ✨
      </h2>

      <div
        ref={ticketRef}
        className="ticket bg-[url('/assets/images/pattern-ticketv2.svg')] aspect-[600/280]  rounded-lg overflow-hidden sm:p-5 p-3 sm:max-w-md mx-auto bg-cover "
      >
        <div className="flex justify-between items-center h-full w-full sm:py-[1px] py-[1.5px]">
          <div className="flex flex-col justify-center items-start text-center">
            <Image
              src="/Flisol-Completo.svg"
              alt="logo"
              width={400}
              height={400}
              className="h-auto w-[64px] sm:w-[80px] md:w-[100px]"
            />
            <p className="sm:text-lg text-gray-400">
              <span className="font-semibold">8 de mayo</span> UTP / Pereira
            </p>
            <div className="flex items-center mt-4">
              <Image
                src={avatarSrc}
                alt="avatar"
                className="h-auto w-[60px] sm:w-[80px] mr-3 rounded"
                width={512}
                height={512}
                onError={() =>
                  setAvatarSrc("/assets/images/avatar-svgrepo-com.svg")
                }
              />
              <div className="text-left">
                <p className="text-lg sm:text-xl text-gray-400 font-medium">{name}</p>
                <p className="flex items-center text-gray-400 text-sm">
                  <Image
                    src="/assets/images/icon-github.svg"
                    alt="icon-github"
                    className="w-3 h-3 mr-1 sm:mr-2 sm:w-4 sm:h-4"
                    width={16}
                    height={16}
                  />
                  @{github}
                </p>
              </div>
            </div>
          </div>
          <p
            className="transform text-gray-400 font-mono text-lg sm:text-xl mr-9 sm:mr-12"
            style={{ transform: "rotate(90deg)" }}
          >
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
          className={`px-4 py-2 rounded text-xl font-bold transition bg-orange-500 hover:bg-orange-600 text-white`}
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

        <div className="mt-6 max-w-2xl mx-auto">
          <p className="text-center text-xl text-white font-semibold mb-2">
            Por tu inscripción al evento, puedes acceder al GitHub Student
            Developer Pack:
          </p>
          <a
            href="https://gh.io/flisol25"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xl text-white underline hover:text-blue-400 font-semibold"
          >
            Accede aquí al GitHub Student Developer Pack
            <Image
              src="/assets/images/GitHubStudentPack.webp"
              alt="GitHub Student Developer Pack"
              width={180}
              height={60}
              className="mx-auto mt-2 rounded shadow"
            />
          </a>
        </div>

        <div className="mt-4 max-w-2xl mx-auto">
          <a
            href="https://education.github.com/pack"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-gray-500 underline hover:text-amber-500 text-sm"
          >
            Más información sobre GitHub Student Developer Pack
          </a>
        </div>
      </div>
    </div>
  );
}
