export type Track =
  | "Cultura libre & Open Source"
  | "Desarrollo de Software"
  | "Inteligencia Artificial"
  | "Industria & Soluciones"
  | "Logística";

export type SlotKind = "talk" | "break" | "logistics";

export type Speaker = {
  id: string;
  name: string;
  handle?: string;
  social?: string;
  img?: string;
};

export type AgendaSlot = {
  time: string;
  title: string;
  kind: SlotKind;
  track: Track;
  duration: string;
  notes?: string;
  speakers?: Speaker[];
  presenter?: string;
  talkInfo?: string;
  repo?: string;
};

export const speakers: Record<string, Speaker> = {
  julianCardenas: {
    id: "julianCardenas",
    name: "Julian Cardenas",
    handle: "@juliankrdnas",
    social: "https://github.com/juliankrdnas",
    img: "/speakers/2026/julian-cardenas.jpg",
  },
  sergioEstrella: {
    id: "sergioEstrella",
    name: "Sergio Daniel Estrella",
    handle: "@Djkde",
    social: "https://github.com/Djkde",
    img: "/speakers/2026/sergio-daniel-estrella.webp",
  },
  eliasEscobar: {
    id: "eliasEscobar",
    name: "Elias Escobar",
    handle: "@Elias200025",
    social: "https://github.com/Elias200025",
    img: "/speakers/2026/elias-escobar.jpeg",
  },
  sergioFlorez: {
    id: "sergioFlorez",
    name: "Sergio Alexander Florez",
    handle: "@xergioalex",
    social: "https://github.com/xergioalex",
    img: "/speakers/2026/sergio-alexander-florez.jpeg",
  },
  andresPrieto: {
    id: "andresPrieto",
    name: "Andrés Manuel Prieto",
    handle: "@AndresMpa",
    social: "https://github.com/AndresMpa",
    img: "/speakers/2026/andres-prieto.webp",
  },
  frederickCastaneda: {
    id: "frederickCastaneda",
    name: "Frederick Johan Castañeda Pérez",
    handle: "@xcerock",
    social: "https://github.com/xcerock",
    img: "/speakers/2026/frederick-castaneda.png",
  },
  carlosRamirez: {
    id: "carlosRamirez",
    name: "Carlos Fernando Ramírez",
    handle: "@carlosframirezb",
    social: "https://github.com/carlosframirezb",
    img: "/speakers/2026/carlos-fernando-ramirez.png",
  },
  camiloSalazar: {
    id: "camiloSalazar",
    name: "Camilo Salazar Duque",
    handle: "@Soren0608",
    social: "https://github.com/Soren0608",
    img: "/speakers/2026/camilo-salazar-duque.jpeg",
  },
  juanCampuzano: {
    id: "juanCampuzano",
    name: "Juan Campuzano",
    handle: "@juan-campuzano",
    social: "https://github.com/juan-campuzano",
    img: "/speakers/2026/juan-campuzano.jpg",
  },
  lauraSanta: {
    id: "lauraSanta",
    name: "Laura Daniela Santa",
    handle: "@lauDanSan",
    social: "https://github.com/lauDanSan",
    img: "/speakers/2026/laura-daniela-santa.jpeg",
  },
  santiagoRamirez: {
    id: "santiagoRamirez",
    name: "Santiago Ramirez",
    handle: "@SantyOkami",
    social: "https://github.com/SantyOkami",
    img: "/speakers/2026/santiago-ramirez.jpeg",
  },
};

export const agenda2026: AgendaSlot[] = [
  {
    time: "8:30 – 8:40 AM",
    title: "Apertura y bienvenida al evento",
    kind: "logistics",
    track: "Logística",
    duration: "10 min",
    notes:
      "Presentación del equipo, código de conducta y agenda del día.",
    presenter: "Organización FLISoL",
  },
  {
    time: "8:50 – 9:20 AM",
    title:
      "El Modelo de \"Mil Ojos\": ¿Es el Código Abierto realmente más seguro?",
    kind: "talk",
    track: "Cultura libre & Open Source",
    duration: "30 min",
    notes:
      "1ª charla del día. Interacción en vivo con el público.",
    speakers: [speakers.julianCardenas],
    talkInfo:
      "Un recorrido por la famosa premisa de Eric S. Raymond: \"con suficientes ojos, todos los errores son superficiales\". ¿Se cumple en la realidad del software libre? Analizaremos casos, incidentes recientes y cómo la cultura de revisión abierta afecta de verdad la seguridad del código.",
  },
  {
    time: "9:30 – 10:00 AM",
    title: "El Open Source en tiempos de IA",
    kind: "talk",
    track: "Cultura libre & Open Source",
    duration: "30 min",
    notes:
      "2ª charla del día. Lenguaje casual y accesible.",
    speakers: [speakers.sergioEstrella],
    talkInfo:
      "Una conversación sobre el estado actual del open source frente al boom de la inteligencia artificial: modelos abiertos, licencias, datos de entrenamiento y cómo la comunidad sigue construyendo tecnología libre en un ecosistema cada vez más dominado por grandes jugadores.",
  },
  {
    time: "10:10 – 10:40 AM",
    title:
      "Ingeniería Robótica con Software Libre: Simulación y Control de un Brazo de 6 GDL con Python y PyBullet",
    kind: "talk",
    track: "Desarrollo de Software",
    duration: "30 min",
    notes: "Demo en vivo del simulador dinámico.",
    speakers: [speakers.eliasEscobar],
    talkInfo:
      "Cómo simular y controlar un brazo robótico de 6 grados de libertad usando Python y PyBullet. Veremos cinemática, dinámica y control en un entorno 100% libre, con demo en vivo del simulador.",
  },
  {
    time: "10:50 – 11:20 AM",
    title:
      "OpenClaw: Tu asistente. Tu máquina. Tus reglas. — La revolución de los agentes personales",
    kind: "talk",
    track: "Inteligencia Artificial",
    duration: "30 min",
    notes: "Requiere audio del PC. Demos en vivo.",
    speakers: [speakers.sergioFlorez],
    talkInfo:
      "OpenClaw propone una nueva generación de agentes personales que se ejecutan bajo tus reglas y en tu propio equipo. Presentación del proyecto, arquitectura y demos en vivo de casos de uso reales.",
  },
  {
    time: "11:30 AM – 12:00 PM",
    title: "Lyra — Agentes locales gestionados",
    kind: "talk",
    track: "Inteligencia Artificial",
    duration: "30 min",
    notes: "Charla para cerrar el bloque AM antes del break.",
    speakers: [speakers.andresPrieto, speakers.frederickCastaneda],
    talkInfo:
      "Lyra es una propuesta para orquestar y gestionar agentes de IA ejecutados localmente. Hablaremos del diseño, los retos de correr modelos en la propia máquina y cómo encajar agentes autónomos dentro de flujos reales de trabajo.",
  },
  {
    time: "12:00 – 2:00 PM",
    title: "Descanso — Tiempo libre",
    kind: "break",
    track: "Logística",
    duration: "2 horas",
    notes: "Sin charlas. Espacio libre para networking y alimentación por cuenta propia.",
  },
  {
    time: "2:10 – 2:40 PM",
    title: "Del caos al orden: gestión de TI con GLPI",
    kind: "talk",
    track: "Industria & Soluciones",
    duration: "30 min",
    notes: "Ponente desde Ibagué — horario intermedio.",
    speakers: [speakers.carlosRamirez],
    talkInfo:
      "GLPI como plataforma abierta para gestionar inventario, incidentes, activos y mesa de ayuda en organizaciones de cualquier tamaño. Casos reales, buenas prácticas y por qué el software libre también gana en TI empresarial.",
  },
  {
    time: "2:50 – 3:50 PM",
    title:
      "De los datos al diálogo: pipeline de IA open-source con datos reales",
    kind: "talk",
    track: "Inteligencia Artificial",
    duration: "60 min",
    notes:
      "Charla especial de 1 hora. Demo en vivo de pipeline RAG completo.",
    speakers: [speakers.camiloSalazar],
    talkInfo:
      "Un recorrido de punta a punta construyendo un pipeline de IA con componentes open source: ingesta y preparación de datos reales, embeddings, vector store y una aplicación RAG funcional. Todo demostrado en vivo.",
  },
  {
    time: "4:00 – 4:30 PM",
    title: "Agentic Workflows con GitHub",
    kind: "talk",
    track: "Inteligencia Artificial",
    duration: "30 min",
    notes: "Premios por participación en preguntas.",
    speakers: [speakers.juanCampuzano],
    talkInfo:
      "Cómo construir flujos de trabajo con agentes apoyándose en el ecosistema de GitHub: Actions, issues, pull requests y copilotos integrados. Una mirada práctica a cómo automatizar procesos de ingeniería con IA.",
  },
  {
    time: "4:40 – 5:10 PM",
    title: "Automatiza tu vida con n8n",
    kind: "talk",
    track: "Inteligencia Artificial",
    duration: "30 min",
    notes: "Última charla del día. Demos en vivo con n8n.",
    speakers: [speakers.lauraSanta],
    talkInfo:
      "n8n es una plataforma open source de automatización visual. Construiremos automatizaciones reales que conectan servicios, APIs y tareas del día a día para demostrar cuánta fricción se puede eliminar sin escribir miles de líneas de código.",
  },
  {
    time: "5:20 – 5:50 PM",
    title: "Cómo probar sistemas distribuidos y asíncronos",
    kind: "talk",
    track: "Desarrollo de Software",
    duration: "30 min",
    notes: "Ejemplos desde cero con preguntas al público.",
    speakers: [speakers.santiagoRamirez],
    talkInfo:
      "Probar sistemas distribuidos y asíncronos duele: colas, reintentos, estados intermedios, eventual consistency. Veremos estrategias, patrones y herramientas libres para construir suites de pruebas que de verdad atrapen los bugs difíciles.",
  },
  {
    time: "5:50 – 6:00 PM",
    title: "Cierre del evento, foto grupal y networking",
    kind: "logistics",
    track: "Logística",
    duration: "10 min",
    notes: "Palabras de cierre y agradecimientos.",
    presenter: "Organización FLISoL",
  },
];

export const agendaSummary = {
  talks: agenda2026.filter((s) => s.kind === "talk").length,
  startTime: "8:30 AM",
  endTime: "6:00 PM",
  breakRange: "12:00 – 2:00 PM",
};

export const uniqueSpeakers: Speaker[] = Array.from(
  new Map(
    agenda2026
      .filter((s) => s.kind === "talk" && s.speakers)
      .flatMap((s) => s.speakers!)
      .map((sp) => [sp.id, sp] as const),
  ).values(),
);
