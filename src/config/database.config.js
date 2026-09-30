import mongoose from "mongoose";
import { envConfig } from "./env.config.js";

export const connectDB = async () => {
    try {
    await mongoose.connect(envConfig.mongoUri);
    console.log("Conexión a la base de datos establecida");

    } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
    }
}
    