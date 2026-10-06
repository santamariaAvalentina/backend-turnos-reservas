import app from "./app.js";
import { envConfig } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

const startServer = async () => {
  await connectDB();

  const httpServer = createServer(app);
  const io = new Server(httpServer);
  app.io = io;

  io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });

  httpServer.listen(envConfig.port, () => {
    console.log(`Servidor escuchando en el puerto ${envConfig.port}`);
  });
};

startServer();