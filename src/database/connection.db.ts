import mongoose from "mongoose";
import { connection_uri, database_config } from "../configs/database.config";
import { errorMessage } from "../shared/utils/errorException.util";
import fastify from "@src/app";

mongoose.connection.on("connected", () => {
  fastify.log.info("Mongodb conectado com sucesso!");
});

mongoose.connection.on("disconnected", () => {
  fastify.log.info("Conexão com o mongodb encerrada.");
});

export async function connectToDb() {
  try {
    await mongoose.connect(connection_uri, database_config);
  } catch (e) {
    fastify.log.info(errorMessage(e));
    throw new Error(errorMessage(e));
  }
}

export async function disconnectToDb() {
  await mongoose.disconnect();
}
