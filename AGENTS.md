# NEXO LIFE 3D

Este repositorio contiene el juego completo para escritorio y móvil. Mantén una sola aplicación adaptable; no crees una copia independiente para teléfonos.

## Entorno

- Node.js 24; instala con `npm ci`.
- Desarrollo: `npm run dev`.
- Antes de entregar cambios: `npm test`, `npm run lint`, `npm run build`.
- E2E local: `npm run test:e2e` y `npm run test:mobile`. Las configuraciones actuales usan Edge en Windows y WebKit para iPhone; instala los navegadores necesarios antes de ejecutarlas.

## Reglas del proyecto

- Conserva la compatibilidad con partidas guardadas v1 o implementa una migración explícita.
- Comprueba controles táctiles, zonas seguras, 320 px de ancho y orientación horizontal al modificar la interfaz.
- Conserva los perfiles gráficos de móvil y la recuperación del contexto WebGL.
- Mantén textos en español y los assets originales o con licencia documentada.
- No subas credenciales, node_modules, dist ni resultados de pruebas.
- Firebase Hosting usa `firebase.json`, directorio `dist`, proyecto `nexo-life-3d-mateo`.
- Trabaja en ramas y entrega pull requests; producción se publica al integrar en `main` mediante la integración de Firebase cuando esté autorizada.

Consulta README.md y docs/ARCHITECTURE.md, docs/MOBILE.md, docs/TESTING.md y docs/FIREBASE.md.
