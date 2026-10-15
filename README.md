# NEXO LIFE 3D — edición móvil 0.3

Interfaz móvil con joystick, gestos de cámara, botones grandes, zonas seguras y disposición horizontal. Perfil gráfico Ahorro automático en móviles; mismas partidas v1. Compatibilidad y pruebas de Safari/WebKit y Android en docs/MOBILE.md.

Rediseño Postal de barrio: paleta crema/tinta/mandarina, tipografías locales, navegación por colores y nuevos detalles urbanos. Referencias y sistema visual en docs/ART_DIRECTION.md. Compatible con partidas v1 de la edición anterior.

Juego publicado: https://nexo-life-3d-mateo.web.app. Configuración y próximos despliegues en docs/FIREBASE.md. Para llevar tu partida desde el enlace anterior, expórtala a JSON e impórtala en la nueva dirección.

Juego original de simulación de vida en español. Ciudad y vivienda 3D con PlayCanvas; React + TypeScript + Vite; simulación determinista en Web Worker; partidas locales en IndexedDB.

## Jugar en este computador

Abre `JUGAR.cmd` o ejecuta con Node.js 22.12+ / 24:

```sh
npm install
npm run dev
```

Abre la dirección local que imprime Vite. Para la versión compilada y la caché sin conexión:

```sh
npm run build
npm run preview -- --port 4173
```

La PWA y su service worker se habilitan en producción, en localhost o HTTPS. Tras completar la primera carga, todos los assets se precargan. Puedes instalar desde el menú de Edge/Chrome si el navegador lo permite. Las partidas de localhost y de la web publicada son independientes: exporta/importa JSON para trasladarlas.

## Primeros pasos

1. Elige uno de cuatro orígenes, nombre, semilla, ropa y tono de piel.
2. En el origen El primer paso, solicita una beca desde Estudios y matricúlate.
3. Avanza el tiempo, responde decisiones y cuida energía, alimentación e higiene. Cada acción ocupa un día. Los saltos se detienen ante una decisión importante.
4. Completa el curso técnico de 30 días o la universidad simplificada de 120; postula a comercio, tecnología o administración municipal según requisitos.
5. El salario se paga cada 30 días; los días parciales se prorratean y se descuentan impuestos del 12%. Consulta Finanzas y Diario → Por qué ocurrió.

Controles: WASD/flechas caminan; clic/tap en suelo elige destino; E interactúa cerca de lugares; rueda hace zoom; arrastre con botón derecho gira cámara. Cambia entre órbita, seguimiento y ciudad en Ajustes. En móvil usa tap y los paneles. Esc abre menú; Espacio avanza un día si no estás en un panel. Tab recorre controles; desde el fondo alterna mapa/diario. Entrar a tu vivienda 3D está en Vida y Ciudad. Salir al barrio regresa a la plaza.

El reloj sólo avanza por tus decisiones, no por tiempo real. Los contratos aplican una rutina automática al avanzar días; Trabajar mejora desempeño. Estudiar mejora notas y habilidades, mientras la asistencia de una matrícula activa avanza si las necesidades lo permiten.

## Respaldos y privacidad

Guardado automático tras cada comando. Menú y Ajustes exportan JSON e importan con validación. Una nueva vida reemplaza el guardado actual; antes de hacerlo se ofrece exportarlo. Borrar los datos del navegador borra sus partidas. Sin cuentas, anuncios, telemetría ni servicios de pago. La instalación inicial requiere descargar las dependencias si ejecutas el código fuente.

## Verificar

```sh
npm test
npm run lint
npm run build
npm run test:e2e
```

E2E usa Microsoft Edge instalado en Windows, en modo headless; en otros sistemas cambia `channel` en playwright.config.ts o instala Chromium con Playwright. Ver docs/TESTING.md.

## Alcance real

Cuatro orígenes, tres distritos, diez NPC persistentes, ocho eventos de dos elecciones, tres carreras, beca y diplomas, gastos/deuda/mudanza, amistad y pareja, promesas, ciclo vital hasta un final persistente. Modos Vida, Historia y Ciudad comparten estado. Mundo y vivienda procedurales originales; apariencia y animaciones articuladas son provisionales.

No equivale al proyecto completo de cinco fases: aún no hay nacimientos, crianza, herederos jugables, construcción municipal, elecciones políticas, emprendimientos, sistema penal, automóviles autónomos, enfermedades complejas, interiores de oficina/escuela, rigs importados ni mercado laboral de miles de agentes. El municipio se consulta; no se construye. Las vacantes son un conjunto acotado reservado al jugador, sin competencia simulada. Las relaciones tienen confianza, consentimiento y memoria causal, pero no árbol genealógico extendido ni convivencia económica. La economía usa cuentas sectoriales inicializadas, sin producción empresarial detallada. La educación y los trayectos son abstracciones comprimidas. El renderer usa WebGL2; WebGPU queda para una fase posterior. Hay tres calidades, sin Ultra ni benchmark garantizado. La versión de partidas inicial es v1; se rechazan otras versiones, aún no hay migraciones históricas. El final conserva la historia y permite exportarla y empezar otra vida; no incluye sucesión.

La prioridad siguiente es ampliar familias y rutinas con memoria social, manteniendo las invariantes del motor.
