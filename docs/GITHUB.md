# GitHub, Codex y Firebase

Repositorio único: https://github.com/MiguelMfb/nexo-life-3d

Incluye escritorio, móvil, assets, simulación, pruebas y configuración Firebase. La interfaz se adapta al dispositivo. No hay dos proyectos separados.

## Otro computador

```sh
git clone https://github.com/MiguelMfb/nexo-life-3d.git
cd nexo-life-3d
npm ci
npm run dev
```

Abre esa carpeta como proyecto en Codex. Antes de comenzar nuevos cambios, actualiza la rama con `git pull --ff-only`. Guarda el trabajo mediante commits y push para que esté disponible en otros equipos.

## Codex Cloud

Conecta GitHub y crea un entorno seleccionando este repositorio. Usa Node.js 24 y `npm ci` para instalar las dependencias. AGENTS.md contiene las instrucciones del proyecto. Revisa los cambios y abre un pull request a main.

Guía oficial: https://learn.chatgpt.com/docs/cloud

## Publicación

El workflow Project checks ejecuta pruebas de simulación, lint y compilación en pull requests y cambios de main. Las pruebas de navegador están incluidas en el repositorio y se ejecutan por separado según docs/TESTING.md y docs/MOBILE.md.

Después de aprobar las verificaciones, los pushes a main publican en https://nexo-life-3d-mateo.web.app. La credencial `FIREBASE_SERVICE_ACCOUNT_NEXO_LIFE_3D_MATEO` ya está configurada como secreto de GitHub Actions. La cuenta de servicio sólo pertenece al proyecto del juego. No necesitas iniciar sesión en Firebase en cada computador para publicar desde GitHub.

Flujo habitual: crea una rama, pide los cambios a Codex, guarda commits y haz push, abre un pull request y revisa las verificaciones. Integra en main para publicar. Desde la pestaña Actions también puedes ejecutar Project checks manualmente sobre main para volver a desplegar. Para recuperar una versión anterior, revierte el commit mediante un nuevo commit y súbelo a main.

Nunca añadas la credencial al código ni la envíes por chat. Si se revoca o rota la clave, actualiza el secreto en Settings → Secrets and variables → Actions. Mientras falte el secreto, el workflow avisa y omite la publicación.

Guía oficial: https://firebase.google.com/docs/hosting/github-integration
