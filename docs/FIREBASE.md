# Publicación en Firebase Hosting

Configuración separada de Sites. `firebase.json` publica únicamente `dist/`; el código fuente, las partidas y los archivos locales no se suben al hosting. Proyecto: `nexo-life-3d-mateo`.

```sh
npm run build
firebase deploy --only hosting --project nexo-life-3d-mateo
```

Firebase Hosting sirve la aplicación estática mediante HTTPS. Las partidas siguen siendo locales al navegador; no se usan Firestore, Analytics ni servicios de base de datos. Las partidas de la dirección anterior no se transfieren automáticamente: exportar JSON desde el juego anterior e importarlo desde Ajustes en la nueva dirección.

Los assets con hash tienen caché larga. El documento, el manifest y el service worker pueden actualizarse sin depender de esa caché. La PWA precarga los archivos de producción para funcionar sin conexión después de la carga inicial.
