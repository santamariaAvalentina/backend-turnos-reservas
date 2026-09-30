import { MessagesRepository } from "../repositories/messages.repository.js";

const messagesRepository = new MessagesRepository();

export class MessagesService {

    async getMessages() {
        return await messagesRepository.getAll();
    }

    async getMessageById(id) {
        return await messagesRepository.getById(id);
    }

    async createMessage(messageData) {
        const { user, message } = messageData;

        if (!user || !message) {
            throw new Error(
                "Los campos user y message son obligatorios"
            );
        }

        const newMessage = {
            user,
            message
        };

        return await messagesRepository.create(newMessage);
    }
}