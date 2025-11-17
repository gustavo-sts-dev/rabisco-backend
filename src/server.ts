import fastify from "./app";
import { env } from "./configs/env.config";
import { connectToDb, disconnectToDb } from "./database/connection.db";

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown)

async function startServer() {
  try {
    await connectToDb();
    
    const PORT = env.PORT || 5000;
    
    fastify.listen({
      port: PORT,
      host: "0.0.0.0",
    });
  } catch (e) {
    gracefulShutdown();
  }
}

async function gracefulShutdown() {
  try {
    fastify.log.info("Recebido sinal de interrupção, desconectando e desligando.");

    await disconnectToDb();

    await fastify.close();

    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
};

startServer();
