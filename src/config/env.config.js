import dotenv from "dotenv";

dotenv.config();
if (!process.env.PORT || !process.env.NODE_ENV) {
    throw new Error("Faltan variables de entorno requeridas");
}