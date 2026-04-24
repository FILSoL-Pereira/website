"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Monitor, Mic, Wrench, UsersRound } from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    icon: Monitor,
    title: "Instalacion de software libre",
    description:
      "Trae tu equipo y nuestros voluntarios te ayudan a instalar Linux y otras herramientas libres.",
  },
  {
    icon: Mic,
    title: "Charlas y conferencias",
    description:
      "Ponentes locales e internacionales comparten conocimiento sobre tecnologia, seguridad, desarrollo y mas.",
  },
  {
    icon: Wrench,
    title: "Talleres practicos",
    description:
      "Aprende haciendo: desde configurar tu primer entorno Linux hasta analisis de datos con herramientas open source.",
  },
  {
    icon: UsersRound,
    title: "Comunidad",
    description:
      "Conecta con desarrolladores, estudiantes, docentes y entusiastas de la tecnologia libre en tu ciudad.",
  },
];

const stats = [
  { value: 200, suffix: "+", label: "Ciudades simultaneas" },
  { value: 20, suffix: "+", label: "Anos de historia" },
  { value: 18, suffix: "", label: "Paises participantes" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-amber-400">
      {display}
      {suffix}
    </span>
  );
}

export default function WhatIsFlisol() {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <section className="relative bg-slate-950 py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="/assets/images/pattern-lines.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Que es el <span className="text-amber-400">FLISoL</span>?
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400">
            El{" "}
            <strong className="text-white">
              Festival Latinoamericano de Instalacion de Software Libre
            </strong>{" "}
            es el evento de difusion de software libre mas grande de
            Latinoamerica. Desde 2005, se realiza de forma simultanea en mas de{" "}
            <strong className="text-amber-400">200 ciudades</strong> de la
            region, promoviendo la libertad tecnologica, el conocimiento abierto
            y la colaboracion comunitaria.
          </p>
        </motion.div>

        <motion.div
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
        >
          {highlights.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group rounded-2xl border border-slate-700 bg-slate-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 transition-all duration-300 group-hover:bg-amber-500/20 group-hover:scale-110">
                <Icon size={24} className="text-amber-400" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {stats.map(({ value, suffix, label }) => (
            <div key={label}>
              <AnimatedCounter value={value} suffix={suffix} />
              <p className="mt-1 text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Image
            src="/Flisol-Completo.svg"
            alt="FLISoL Logo completo"
            width={280}
            height={80}
            className="drop-shadow-[0_0_8px_rgba(251,191,36,0.2)]"
          />
        </div>
      </div>
    </section>
  );
}
