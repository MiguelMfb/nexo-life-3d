# Validación

Rediseño 0.2: build y lint correctos; 13 pruebas de motor y dos de navegador correctas (18,5 s E2E). Capturas de inicio desktop/móvil, barrio, interior y mapa móvil inspeccionadas. La prueba offline incluye las dos fuentes locales y sus licencias en la precarga (12 assets). Sin cambios al esquema v1. El arte aumenta dist a aproximadamente 3 MB; el aviso de tamaño del bundle principal sigue siendo un aviso de Vite.

Resultado observado el 15 de octubre de 2026: compilación TypeScript/Vite correcta; 13 pruebas unitarias correctas (aprox. 1,3 s); dos E2E correctas (16 s) en Edge. Lint correcto, auditoría npm con cero vulnerabilidades. Bundle principal aproximadamente 2,56 MB sin comprimir / 691 KB gzip; Worker 75 KB; CSS 29 KB / 7 KB gzip; total dist menor a 3 MB. Vite informa un aviso de tamaño del bundle, no un fallo. No se certifica una tasa de FPS en hardware real; el HUD de Ajustes muestra las mediciones de cada sesión. Capturas desktop, interior y móvil inspeccionadas.

`npm test`: determinismo, rechazo atómico, conservación de dinero, beca→matrícula→graduación→elegibilidad laboral, requisitos de alquiler/puestos, no duplicación al cambiar modo/cargar, exportación y continuidad, calendario y cumpleaños a diez años, archivos inválidos, deuda y pérdida de vivienda, promesas cumplidas/incumplidas, final de vida y bloqueo de acciones, vínculos persistentes y parentesco.

`npm run test:e2e`: Edge headless, WebGL2 con SwiftShader disponible. Desktop 1440×900 y móvil 390×844. Nueva partida→beca→matrícula→graduación→contrato tecnológico→salario→causalidad→exportar→recargar→continuar→interior. Móvil: mapa sin desbordamiento horizontal, menú por teclado, Escape y recarga offline. Errores JS del navegador hacen fallar la prueba. Headless y emulación móvil no equivalen a probar un teléfono físico o una GPU concreta.

QA manual: revisar WASD/tap, acercarse a edificios y pulsar E, comprobar colisiones y órbita, contrastar necesidades antes/después, importar JSON malformado, exportar antes de nueva vida, cambiar calidad, probar sonido y volumen, envejecer hasta final y exportar legado. Comprobar que las preferencias reduced-motion desactivan transiciones CSS. Inspeccionar guardado en consola sólo para diagnóstico; la UI muestra fallos.

En la primera compilación se detectó un fallo offline por `Vary: Origin` en assets del servidor de preview. Se corrigió la búsqueda en caché estática con ignoreVary. No se ignoran cabeceras de contenido autenticado porque el juego no hace peticiones de ese tipo ni cachea servicios remotos.

Limitaciones de accesibilidad: el mundo 3D no describe coordenadas a lectores de pantalla; todos los sistemas de vida y viajes están disponibles mediante controles DOM. Los paneles usan teclado y diálogos bloqueantes contienen foco. Se requiere una revisión humana de contraste y lectores de pantalla antes de distribución amplia.
