import { MessagesDAO } from "../dao/messages.dao.js";

const messagesDAO = new MessagesDAO();

export class MessagesRepository {

    async getAll() {
        return await messagesDAO.getAll();
    }

    async getById(id) {
        return await messagesDAO.getById(id);
    }

    async create(message) {
        return await messagesDAO.create(message);
    }
}