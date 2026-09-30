import { MessageModel } from "./models/message.model.js";

export class MessagesDAO {

    async getAll() {
        return await MessageModel.find();
    }

    async getById(id) {
        return await MessageModel.findById(id);
    }

    async create(message) {
        return await MessageModel.create(message);
    }
}