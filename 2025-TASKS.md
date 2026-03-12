* Backend / datos
  * Integrar Prisma y eliminar el uso directo del cliente de Supabase en el frontend.
    * Mover lecturas/escrituras de `registrations` a rutas de API/handlers usando Prisma.
    * Mantener el schema como fuente de verdad para futuras migraciones.
  * Migrar la información del 2025 a una subsección de la página.
    * Definir estructura de datos hardcodeada en el proyecto (por ejemplo `src/app/data/agenda-2025.ts`).
    * Consumir esos datos desde la nueva subsección sin depender de Supabase/Prisma.

* Mapa / ubicación
  * Hacer migración de Google Maps a OpenStreetMap.
    * Reemplazar `@vis.gl/react-google-maps` por una librería basada en OSM (Leaflet/MapLibre).
    * Mantener estilo visual coherente con el diseño actual.

* Agenda 2026 (estado temporal)
  * Como aún no hay horarios 2026, mostrar mensaje temporal.
    * Texto tipo: "Conoce nuestra agenda pronto".
    * Mantener visible el botón para inscripción como asistente que lleve al formulario actual.

* Feature de QR / asistencia
  * El ticket debe incluir un QR con datos mínimos para identificar al asistente.
    * Definir payload mínimo (ID de registro / token) y formato del QR.
    * Evitar exponer datos sensibles directamente en el QR.
  * Crear una página admin protegida para leer QR y marcar asistencia.
    * Acceso mediante login simple con credenciales desde variables de entorno.
    * Guardar sesión mínima (cookie/token) para no pedir contraseña en cada lectura.
    * Al leer un QR, identificar al asistente y marcar `checked_in` / `checked_in_at`.

* Contenido del año actual
  * Actualizar la web con la información del FLISoL del año en curso (fecha, lugar, agenda base, ponentes, etc.).

* Gamificación de charlas
  * Permitir que cada ponente defina una lista de preguntas para su charla.
  * Construir interfaz para que asistentes respondan y ganen puntos.
  * Implementar ranking/puntuación y premio para quienes acumulen más puntos.

* Generación de imágenes de asistentes
  * Explorar una feature para generar imágenes/avatares de los asistentes en estilo “chibi” similar a Code Brew.
  * Integrar esa imagen en el ticket (visualización y/o descarga).

* Notas generales
  * Todo debe seguir los estilos actuales del sitio.