import express from "express";

import servicesRouter from "./routes/services.router.js";

import bookingsRouter from "./routes/bookings.router.js";

import messagesRouter from "./routes/messages.router.js";

import { engine } from "express-handlebars";

import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/api/services", servicesRouter);

app.use("/api/messages", messagesRouter);

app.use("/api/bookings", bookingsRouter);

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set("views", "./src/views");

app.use("/views", viewsRouter);

export default app;