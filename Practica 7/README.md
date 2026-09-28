# Practica 7

Autor: Raybel Martínez

Servicios HTTP e inserción de recetas en myDatabase.recipes.

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
