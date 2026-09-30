import { MessagesService } from "../services/messages.service.js";

const messagesService = new MessagesService();

export class MessagesController {

    async getMessages(req, res) {
        try {
            const messages = await messagesService.getMessages();
            res.json(messages);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getMessageById(req, res) {
        try {
            const { id } = req.params;

            const message = await messagesService.getMessageById(id);

            if (!message) {
                return res.status(404).json({
                    error: "Mensaje no encontrado"
                });
            }

            res.json(message);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async createMessage(req, res) {
        try {
            const message = await messagesService.createMessage(req.body);

            res.status(201).json(message);

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}