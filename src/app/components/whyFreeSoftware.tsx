"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Code, Users, Globe } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Privacidad y seguridad",
    description:
      "El codigo abierto permite auditar el software que usas. Sin puertas traseras, sin vigilancia oculta. Tu controlas tus datos.",
  },
  {
    icon: Code,
    title: "Aprendizaje sin limites",
    description:
      "Puedes estudiar como funciona cualquier programa, modificarlo y aprender de los mejores proyectos del mundo sin barreras de acceso.",
  },
  {
    icon: Users,
    title: "Colaboracion global",
    description:
      "Linux, Firefox, Python, WordPress — los proyectos que mueven internet son construidos por comunidades, no por corporaciones cerradas.",
  },
  {
    icon: Globe,
    title: "Acceso para todos",
    description:
      "El software libre elimina barreras economicas. Cualquier persona, escuela u organizacion puede usar herramientas de calidad profesional sin costo.",
  },
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

export default function WhyFreeSoftware() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative bg-slate-900 py-20 px-4 sm:px-6 text-white overflow-hidden">
      <div className="absolute inset-0 bg-radial-[at_50%_0%] from-amber-500/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Por que software{" "}
            <span className="text-amber-400">libre</span>?
          </h2>
        </motion.div>

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Mas que una alternativa gratuita, el software libre es un movimiento
          que defiende la libertad de los usuarios y el acceso al conocimiento.
        </motion.p>

        <div className="mx-auto mb-12 h-px max-w-md bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        <motion.div
          ref={ref}
          className="grid gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reasons.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group rounded-2xl border border-slate-700 bg-slate-800/50 p-8 text-center transition-all duration-300 hover:bg-slate-800 hover:border-amber-500/30"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 transition-all duration-300 group-hover:bg-amber-500/20 group-hover:scale-110">
                <Icon
                  size={28}
                  className="text-amber-400 transition-colors group-hover:text-amber-300"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
              <p className="text-gray-400 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
