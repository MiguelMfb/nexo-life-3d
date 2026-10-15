# Arquitectura
TypeScript puro: comandos validados antes de mutar una copia, RNG xorshift, calendario UTC, libro contable en centavos y eventos con causas/efectos. Web Worker recibe protocolo v1 y publica snapshots sólo tras comandos. React representa snapshots; Zustand controla paneles/cámara/calidad. PlayCanvas no contiene lógica financiera o social. Dexie guarda en IndexedDB; exportación validada con Zod. Assets generados en código, sin servicios remotos. Service worker precarga todo dist para jugar offline después de la primera carga.

Sin simulación física externa ni backend. Locomoción local reconciliada por comando al salir de escena. NPC tienen identidad, ocupación, vínculo, ánimo y agenda simplificados. No se representan miles de biografías. Población municipal agregada.
