import dotenv from "dotenv";

dotenv.config();
if (!process.env.PORT || !process.env.NODE_ENV || !process.env.MONGO_URI) {
    throw new Error("Faltan variables de entorno requeridas");
}
export const envConfig = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV ,
    mongoUri: process.env.MONGO_URI
};