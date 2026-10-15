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

Después de aprobar las verificaciones, los pushes a main publican en https://nexo-life-3d-mateo.web.app **sólo cuando se configure** el secreto de Actions `FIREBASE_SERVICE_ACCOUNT_NEXO_LIFE_3D_MATEO`. Mientras no exista, el workflow avisa y omite la publicación. Subir código a GitHub por sí solo todavía no actualiza Firebase.

La autorización de despliegue está pendiente. El secreto debe contener una credencial de cuenta de servicio autorizada para Hosting en `nexo-life-3d-mateo`; nunca debe añadirse al código ni enviarse por chat. Crear una clave persistente requiere aprobación del propietario. Firebase documenta el asistente `firebase init hosting:github`, que crea y cifra el secreto; si se usa, revisar los workflows generados para evitar duplicar despliegues y conservar pruebas antes de publicar.

Guía oficial: https://firebase.google.com/docs/hosting/github-integration
