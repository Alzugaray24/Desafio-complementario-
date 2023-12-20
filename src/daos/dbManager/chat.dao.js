import { chatModel } from "../../models/chat.model.js"

class ChatDao {
    constructor() {
        this.model = chatModel;
    }

    async getChat() {
        return await this.model.find().lean();
    }

    async addMessage(message) {
        return await this.model.create(message);
    }

    async getMessageById(messageId) {
        return await this.model.findById(messageId);
    }

    async updateMessage(messageId, updatedMessage) {
        return await this.model.findByIdAndUpdate(messageId, updatedMessage, { new: true });
    }

    async deleteMessage(messageId) {
        return await this.model.findByIdAndDelete(messageId);
    }
}

export default ChatDao;
