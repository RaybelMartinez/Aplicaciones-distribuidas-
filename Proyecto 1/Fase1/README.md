# Fase1

Autor: Raybel Martínez

Preparación de cinco usuarios de ejemplo.

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

Configura `TELEGRAM_CHAT_ID` para tus usuarios de prueba. El script conserva los usuarios existentes; solo vacía la colección si estableces explícitamente `RESET_DEMO_USERS=true`. Ejecutarlo repetidamente puede duplicar los usuarios de ejemplo.
