# Formato de partida v1

JSON serializable validado con Zod (`src/simulation/model.ts`) y reglas de integridad (`validateSave`). Incluye identidad y semilla, RNG, tick y calendario, modo, jugador, diez NPC, cuentas, transacciones, eventos causales, compromisos programados, decisiones vistas, decisión pendiente, indicadores urbanos y revisión. No guarda objetos de PlayCanvas, componentes React ni referencias del renderer.

IndexedDB `nexo-life`, versión DB1, tabla saves, clave `current`. Estado completo guardado tras comandos mediante cola ordenada. Cerrar paneles no descarta relaciones. La exportación conserva también RNG y consecuencias futuras, por lo que reimportar y continuar las mismas decisiones da el mismo estado. Archivos mayores de 15MB se rechazan. Cargas verifican IDs únicos, referencias, cuentas, calendario y vínculos. Otros esquemas se rechazan con error; no existen partidas previas que migrar en esta primera versión. Futuras migraciones deben añadirse antes de ampliar schemaVersion.

Posición intradía del avatar y cámara son presentación. Se conserva el lugar canónico (hogar/barrio), no una coordenada exacta al recargar. Calidad, audio y paneles son preferencias de la sesión.
