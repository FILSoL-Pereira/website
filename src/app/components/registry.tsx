"use client";
import { useState, useEffect } from 'react';

import Image from 'next/image';
import { createClient } from '../utils/supabase';

const supabase = createClient();

type Errors = {
  name: boolean;
  email: boolean;
  github: boolean;
};

type Step = 'form' | 'ticket';

export default function Registry() {
  // Sección activa: 'form' o 'ticket'
  const [step, setStep] = useState<Step>('form')

  // Campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');

  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    github: false,
  });

  const [ticketNumber, setTicketNumber] = useState<string>('');


  useEffect(() => {
    const num = '#' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    setTicketNumber(num);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      github: github.trim() === '',
    };
    setErrors(newErrors);
  
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

        const { data: existing, error: lookupError } = await supabase
        .from('registrations')
        .select('*')
        .eq('github_username', github)
        .single();
      
      if (lookupError && lookupError.code !== 'PGRST116') {
        console.error('Error al buscar usuario existente:', lookupError.message);
        alert('Hubo un error al verificar el registro.');
        return;
      }
    
      if (existing) {
        setName(existing.name);
        setEmail(existing.email);
        setTicketNumber(existing.ticket_number);
        setStep('ticket');
        return;
      }
    
    const { error } = await supabase
      .from('registrations')
      .insert([{ name, email, github_username: github, ticket_number: ticketNumber }]);
  
    if (error) {
      console.error('Error al registrar en Supabase:', error.message);
      alert('Hubo un error al registrar. Intenta nuevamente.');
      return;
    }
  
    setStep('ticket');
  };

  return (
    <main className="w-full py-8 px-6 bg-[url('/assets/images/background-desktop.png')] text-white">
      {step === 'form' && (
        <section className="first-section max-w-lg mx-auto">
          <h1 className="text-4xl font-bold mb-4">Registro</h1>
          <form id="form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block font-medium">Nombre Completo</label>
              <input
                id="full-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <small className="text-red-500">Nombre Completo requerido</small>}
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <small className="text-red-500">Por favor ingresa un correo electrónico válido</small>}
            </div>

            <div>
              <label htmlFor="github-username" className="block font-medium">
                Usuario de GitHub
              </label>
              <input
                id="github-username"
                type="text"
                value={github}
                onChange={e => setGithub(e.target.value)}
                className={`w-full border p-2 rounded ${errors.github ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.github && <small className="text-red-500">Usuario de GitHub requerido</small>}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              Registrarse
            </button>
          </form>
        </section>
      )}

      {step === 'ticket' && (
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
                  <Image src={`https://unavatar.io/github/${github}`} alt="avatar" className="w-16 h-16 rounded mr-3" width={64} height={64} />
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
      )}
    </main>
  );
}
