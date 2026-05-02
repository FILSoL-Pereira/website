# FLISOL Pereira — Tareas 2025/2026

## Backend / datos

- [x] Integrar Prisma y eliminar el uso directo del cliente de Supabase en el frontend.
- [x] Migrar la información del 2025 a una subsección de la página.

## Mapa / ubicación

- [ ] Hacer migración de Google Maps a OpenStreetMap.

## Agenda 2026 (estado temporal)

- [ ] Mostrar mensaje temporal tipo "Conoce nuestra agenda pronto" mientras no haya horarios 2026.
- [ ] Mantener visible el botón de inscripción como asistente que lleve al formulario actual.

## Feature de QR / asistencia

- [x] El ticket incluye un QR con el ID de registro (UUID) como payload mínimo.
- [x] Crear página admin protegida (`/admin/checkin`) para leer QR y marcar asistencia.
  - [x] Acceso mediante login simple con credenciales desde variables de entorno.
  - [x] Sesión mínima con cookie firmada (no pide contraseña en cada lectura).
  - [x] Al leer un QR, identificar al asistente y marcar `checked_in` / `checked_in_at`.
- [x] Soporte de roles por ruta de registro (`/register`, `/register/speaker`, `/register/staff`, `/register/organizer`).
  - [x] Si un usuario ya registrado se registra desde una ruta con rol distinto, el rol se actualiza.
- [ ] Agregar una página extra de consultar el QR si es necesario.

## Panel de administración

- [x] Layout admin compartido con auth gate, login reutilizable y navegación (`/admin/layout.tsx`).
- [x] Dashboard (`/admin/dashboard`) con estadísticas: total registros, check-ins, pendientes, tasa %, desglose por rol.
- [x] Tabla de registros buscable/filtrable por nombre, email, ticket, rol y estado.
- [x] Exportar registros como CSV (`/api/admin/registrations/csv`).

## Contenido del año actual

- [ ] Actualizar la web con la información del FLISoL del año en curso (fecha, lugar, agenda base, ponentes, etc.).

## Gamificación de charlas

- [ ] Permitir que cada ponente defina una lista de preguntas para su charla.
- [ ] Construir interfaz para que asistentes respondan y ganen puntos.
- [ ] Implementar ranking/puntuación y premio para quienes acumulen más puntos.

## Generación de imágenes de asistentes

- [ ] Explorar feature para generar imágenes/avatares de los asistentes en estilo "chibi" similar a Code Brew.
- [ ] Integrar esa imagen en el ticket (visualización y/o descarga).

## Formulario de registro

- [ ] Actualizar formulario con los nuevos campos de la ASEUTP si es requetido y modificar el schema..

## Notas generales

- Todo debe seguir los estilos actuales del sitio.
- Revisar en general que todos los lugares muestren las fechas correctas o datos correctos
  - Pagina secundario 2025
  - Pagina principal 2026
  - Formulario 
  - Ticket generado

