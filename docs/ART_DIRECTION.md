# Nexo 0.2 — Postal de barrio

Una ciudad cotidiana que invita a escribir una historia propia. Dirección gráfica original: señalética de barrio, fichas de papel, etiquetas de equipaje y postales. Se prioriza carácter, lectura y consistencia sobre efectos decorativos.

## Paleta

| Token | Color | Uso |
|---|---|---|
| Papel | `#FFF6E6` | Fondo, HUD, paneles y fichas |
| Tinta | `#252936` | Texto, contornos, navegación |
| Mandarina | `#FF7146` | Acción principal, marca y decisiones |
| Sol | `#FFD46A` | Vida, perfil y detalles de orientación |
| Cielo | `#81B9F6` | Estudios y mapa |
| Menta | `#BEE4BC` | Finanzas y progresión |
| Rosa | `#EEB4BD` | Vínculos |

Barlow Condensed ExtraBold para títulos y números; DM Sans para lectura y controles. Archivos locales, sin peticiones de fuentes externas en ejecución. Contornos de tinta, sombras desplazadas cortas, esquinas redondeadas y una inclinación moderada en etiquetas. Cada sección tiene su propio acento. No se usan logos, personajes, assets ni interfaces extraídas de las referencias.

La escena sigue esa misma dirección: fachadas salmón, cielo y verde; calles pizarra; vegetación más profunda; exposición y tonemapping ACES que evitan el amarillo quemado. Jardineras, flores, banderines, mesas con sombrillas, pasos peatonales y mosaicos de plaza. Son detalles de presentación, no nuevas mecánicas de juego.

## Referencias consultadas

- [Ooblets, sitio oficial](https://ooblets.com/): referencia de expresividad y color en un mundo cotidiano. Se estudió su composición visual, sin reutilizar assets ni su identidad.
- [Playdate, historia de diseño de Panic](https://blog.panic.com/the-story-of-playdate/) y [sitio oficial](https://play.date/): referencia de tipografía con presencia, controles claros y un acento de color reconocible.
- [despelote, editorial oficial](https://games.panic.com/despelote/): referencia temática de una historia vinculada a un lugar cotidiano latinoamericano; no se tomó su estilo de render ni se utilizó su contenido.

Implementación: `src/art-direction.css` contiene tokens y estilos; `src/rendering/World.ts` crea el barrio; `src/App.tsx` asigna los colores de las secciones. La paleta no modifica el esquema ni las reglas de las partidas existentes.
