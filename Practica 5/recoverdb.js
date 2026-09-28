const { MongoClient } = require('mongodb');

async function listDatabases(client) {
  const databasesList = await client.db("admin").admin().listDatabases();

  console.log("Bases de datos disponibles:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Configura la variable de entorno MONGODB_URI");
  }

  const client = new MongoClient(uri);

  try {
    console.log("Intentando conectar a MongoDB Atlas...");
    await client.connect();
    console.log("¡Conexión exitosa! 🚀");

    await listDatabases(client);

  } catch (e) {
    console.error("Error detectado:", e.message);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
