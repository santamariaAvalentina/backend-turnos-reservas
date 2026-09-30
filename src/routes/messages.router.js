import express from "express";
import { MessagesController } from "../controllers/messages.controller.js";

const router = express.Router();

const messagesController = new MessagesController();

router.get("/", messagesController.getMessages);
router.get("/:id", messagesController.getMessageById);
router.post("/", messagesController.createMessage);

export default router;