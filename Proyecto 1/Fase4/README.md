# Fase4

Autor: Raybel Martínez

Autenticación con PIN, consulta de usuario y cierre de sesión.

## Ejecutar

1. Instala Node.js compatible con las dependencias y ejecuta `npm install`.
2. Configura `MONGODB_URI` con la conexión de tu propia base de datos.
3. Ejecuta `npm start` dentro de esta carpeta.

PowerShell:

```powershell
$env:MONGODB_URI = "mongodb+srv://USUARIO:CONTRASENA@TU_CLUSTER/"
npm start
```

Bash:

```bash
export MONGODB_URI='mongodb+srv://USUARIO:CONTRASENA@TU_CLUSTER/'
npm start
```

Los datos de acceso deben configurarse de forma privada. La conexión y las operaciones de base de datos requieren tu MongoDB y no se han ejecutado durante la preparación.

## Telegram

Configura `TELEGRAM_BOT_TOKEN` con tu bot y el `telegramChatId` de cada usuario de prueba. No se enviaron mensajes durante la preparación. Abre `http://localhost:3000` después de iniciar el servidor.

Código académico: usa cuentas y contraseñas de prueba; no está preparado como sistema de autenticación de producción.
