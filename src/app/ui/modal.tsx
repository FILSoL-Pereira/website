import { useEffect } from "react";
import Image from "next/image";

type Conference = {
  name: string;
  title: string;
  time: string;
  img: string;
  info: string;
  repo?: string;
  social?: string;
};

export default function ModalConference({
  conference,
  onClose,
}: {
  conference: Conference | null;
  onClose: () => void;
}) {

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!conference) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-0"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-2xl sm:max-w-3xl w-full relative shadow-2xl max-h-[75vh]  overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-amber-500"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row items-center gap-4 self-start sm:pl-10">
            <Image
              src={conference.img || "/Flisol-Logo.svg"}
              alt={`Foto de ${conference.name}`}
              width={100}
              height={100}
              className="w-16 h-16 sm:w-30 sm:h-30 rounded-full object-cover border-2 border-amber-500"
            />
            <div>
              <p className="text-xl sm:text-4xl font-semibold text-white">
                {conference.name}
              </p>
              <a
                href={conference.social}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline text-lg sm:text-2xl mt-2"
              >
                Ver perfil
              </a>
            </div>
          </div>

          <h3 className="sm:text-3xl text-xl font-bold text-center sm:p-4">
            {conference.title}
          </h3>

          <time className="text-xl text-amber-400 font-bold">
            {conference.time || "Hora por confirmar"}
          </time>
          <p className="text-lg sm:text-xl text-gray-300 sm:p-6">
            {conference.info}
          </p>

          {conference.repo && (
            <a
              href={conference.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline self-end"
            >
              Conocer más
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
