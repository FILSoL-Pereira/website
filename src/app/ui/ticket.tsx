
"use client";
import { useState } from 'react';

import Image from 'next/image';
export default function Ticket({ name, github, ticketNumber }: { name: string; github: string; ticketNumber: string }) {
  const [avatarSrc, setAvatarSrc] = useState(`https://unavatar.io/github/${github}`);

  
  return (
    <section className="second-section text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            ¡Gracias por registrarte! <span className="text-gradient">{name}</span>🎉 Te esperamos!
            
          </h2>

          <div
            className="ticket rounded-lg overflow-hidden max-w-md mx-auto"
            style={{
              backgroundImage: "url('/assets/images/pattern-ticket.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '20px',
            }}
          >
            <div className="p-4 flex justify-between items-start">
              <div>
                <Image src="/Flisol-Completo.svg" alt="logo" className="mb-2" width={64} height={32} />
                <p className="text-sm text-gray-400 text-left">
                  <span className="font-medium">8 de mayo</span> UTP/ Pereira
                </p>
                <div className="flex items-center mt-4">
                  <Image src={avatarSrc} alt="avatar" className="w-16 h-16 rounded mr-3" width={64} height={64} onError={() => setAvatarSrc('/assets/images/avatar-svgrepo-com.svg')} />
                  <div className="text-left">
                    <p className="text-lg text-gray-400 font-medium">{name}</p>
                    <p className="flex items-center text-gray-400">
                      <Image src="/assets/images/icon-github.svg" alt="icon-github" className="w-5 h-5 mr-1" width={20} height={20} />
                      @{github}
                    </p>
                  </div>
                </div>
              </div>
              <p className="transform rotate-90 text-gray-400 font-mono text-xl">{ticketNumber}</p>
            </div>
          </div>
        </section>
  );
}