"use client";
import { useRef, useState } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas-pro';
import Link from 'next/link';

export default function Ticket({
  name,
  github,
  ticketNumber
}: { name: string; github: string; ticketNumber: string }) {
  const [avatarSrc, setAvatarSrc] = useState(`https://unavatar.io/github/${github}`);
  const ticketRef = useRef<HTMLDivElement>(null);

  // Función para descargar como imagen PNG
  const downloadAsImage = async () => {
    if (!ticketRef.current) return;
    const canvas = await html2canvas(ticketRef.current, { scale: 2 });
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${ticketNumber.replace('#', '')}_ticket.png`;
    link.click();
  };


  return (
    <section className="second-section text-center">
      <h2 className="text-3xl font-bold mb-8 text-white">
        ¡Gracias por registrarte! <span className="text-gradient">{name}</span>
      </h2>

      <div 
        ref={ticketRef}
        className="ticket rounded-lg overflow-hidden max-w-md mx-auto"
        style={{
          backgroundImage: "url('/assets/images/pattern-ticket.svg'),  url('./assets/images/background-desktop.png')",
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center',
          padding: '30px',
        }}
      >
        <div className="p-4 flex justify-between items-start">
          <div>
            <Image src="/Flisol-Completo.svg" alt="logo" width={64} height={32} />
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
                onError={() => setAvatarSrc('/assets/images/avatar-svgrepo-com.svg')}
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
          <p className="transform rotate-90 text-gray-400 font-mono text-xl">{ticketNumber}</p>
        </div>
      </div>

      <div className="mt-6 space-x-4">
        <p className="text-lg text-gray-400 mb-2">
          Descarga tu ticket para participar de las sorpresas 🎁
        </p>
        <p className="text-blue-400 underline hover:text-blue-300 mb-4">
        <Link href={'https://github.com/FILSoL-Pereira/.github/blob/main/AWARDS.md'} target='__blank'>Revisa las condiciones de participación</Link>
        </p>
        <button
          onClick={downloadAsImage}
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
        >
          Descargar Ticket
        </button>
      </div>
    </section>
  );
}
