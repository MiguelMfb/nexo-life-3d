# Edición móvil 0.3

Diseñada para navegadores móviles modernos con WebGL2: Safari/iOS, Chrome/Android y otros navegadores con prestaciones equivalentes. Las pruebas automáticas usan WebKit 27.2 en Windows con perfil de iPhone y Microsoft Edge/Chromium con perfiles táctiles Android y teléfono de 320×568. Esto no sustituye una prueba en un iPhone físico ni certifica todos los modelos o versiones antiguas de iOS.

## Interfaz

- Cinco destinos de navegación inferior: Vida, Aprender, Trabajo, Mapa y Más. Más contiene todos los sistemas, incluido Vínculos, Finanzas, Diario y Ajustes.
- Ficha compacta del personaje; tocarla abre necesidades y bienestar completos.
- Avance rápido de un día y hoja de opciones para semana, mes y año; no hay opciones ocultas por falta de espacio.
- Paneles desplazables con lectura mayor y controles principales de al menos 44 píxeles. Inputs y selectores de 16px evitan el zoom automático de foco habitual de Safari. No se desactiva el zoom de accesibilidad en documentos.
- Viewport dinámico, zonas seguras para notch/indicador de inicio, distribución horizontal y modales ajustados al viewport visual cuando aparece el teclado.

## Controles

Joystick para caminar, toque sobre suelo para elegir destino, arrastre con un dedo para girar, dos dedos para zoom/rotación. También hay botones de acercar, alejar y girar. Soltar/cancelar un gesto o abrir un panel detiene la entrada de movimiento. Las acciones cercanas tienen botón táctil; no requieren E ni ratón.

## Rendimiento

Perfil Ahorro predeterminado en dispositivos compactos: resolución 3D limitada a un píxel por píxel CSS, sin sombras y cinco NPC visibles. Los diez NPC siguen en la simulación. La cámara empieza siguiendo al protagonista. Render limitado a un objetivo máximo de 30 FPS; no es una promesa de FPS sostenidos en todo hardware. Vista inicial a 12 FPS y render detenido tras estabilizar paneles o al ocultar pestaña. El audio se suspende en segundo plano.

Geometría inmóvil agrupada mediante el batcher de PlayCanvas; personajes excluidos para conservar movimiento. En el perfil WebKit/iPhone emulado se observaron aproximadamente 180 llamadas de dibujo y un buffer 390×844 para un viewport CSS 390×844; no son mediciones de una GPU iPhone física. Texturas y materiales de carteles se liberan al cambiar de escena y antes de destruir el dispositivo gráfico. Una pérdida de contexto WebGL muestra recuperación explícita sin alterar la partida.

Se observa el contenedor del canvas, no el canvas con tamaño fijado por el motor, para redimensionar correctamente. Al cambiar entre vertical y horizontal en dispositivos móviles se reconstruye el contexto gráfico conservando coordenadas, ángulo, zoom y lugar. Esto evita la vista vacía observada en WebKit tras redimensionar el framebuffer. La reconstrucción es local y no descarga otra vez el motor ni cambia el reloj o la partida.

Motor 3D separado en un chunk de ~2,11 MB / 547 KB gzip. Bundle de interfaz ~464 KB / 146 KB gzip, frente al anterior bundle conjunto ~2,57 MB / 691 KB gzip. La descarga total no disminuye en esa proporción: separar permite cachear el motor de forma independiente en actualizaciones de UI.

## Guardado, instalación y actualizaciones

Mismo esquema v1 y partidas locales, compatibles con versiones previas. Exportación JSON usa Compartir archivos si el navegador móvil lo admite, con descarga como alternativa. Cancelar Compartir no altera la partida. Importación disponible desde menú y Ajustes.

Safari: Compartir → Añadir a pantalla de inicio. Chrome: menú → Instalar aplicación, cuando el navegador lo ofrezca. Service worker precarga fuentes, UI, Worker y motor. Navegaciones prefieren red y usan el documento cacheado sin conexión; assets usan caché por versión. No se reinicia la página automáticamente a mitad de una decisión al actualizar.

## Reproducir pruebas

```sh
npm run build
npx playwright install webkit
npm run test:mobile
```

Se necesitan WebKit de Playwright y Microsoft Edge en Windows. El entorno de desarrollo puede fijar PLAYWRIGHT_BROWSERS_PATH a un directorio de navegadores de prueba. `playwright.mobile.config.ts` contiene perfiles y pruebas. `npm run test:e2e` conserva la regresión desktop separada.

Referencias técnicas consultadas: [zonas seguras y viewport de WebKit](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) y [touch-action y respuesta al toque](https://webkit.org/blog/5610/more-responsive-tapping-on-ios/). Se aplican como APIs web, sin copiar interfaces externas.
