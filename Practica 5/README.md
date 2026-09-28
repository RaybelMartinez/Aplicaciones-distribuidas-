# Práctica 5 — Conexión a MongoDB

Autor: Raybel Martínez

## Preparación

1. Instala las dependencias con `npm install`.
2. Configura `MONGODB_URI` con la cadena de conexión de tu propia base de datos.

En PowerShell:

```powershell
$env:MONGODB_URI = "mongodb+srv://USUARIO:CONTRASENA@TU_CLUSTER/"
```

En Bash (Linux o macOS):

```bash
export MONGODB_URI='mongodb+srv://USUARIO:CONTRASENA@TU_CLUSTER/'
```

Sustituye los marcadores por tus datos de MongoDB Atlas y configura el acceso de red y los permisos del usuario. No publiques tu contraseña.

## Ejecución

```bash
node index.js
node recoverdb.js
```

`index.js` comprueba la conexión mediante un ping. `recoverdb.js` lista las bases de datos visibles para el usuario configurado.

La variable debe estar configurada en la misma terminal donde ejecutes los comandos. El código no carga archivos `.env` automáticamente.
