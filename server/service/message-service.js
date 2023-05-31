const messageModel = require("../models/message-model");
const ApiError = require('../exceptions/api-error');

class MessageService {
    async getAllMessages(recipient) {
        try {
            return await messageModel.find({recipient: recipient});
        } catch (err) {
            throw ApiError.BadRequest('Failed to fetch messages', [err]);
        }
    }

    async createMessage(sender, recipient, title, body) {
        try {
            return await messageModel.create({sender, recipient, title, body});
        } catch (err) {
            throw ApiError.BadRequest('Failed to create message', [err]);
        }
    }
}

module.exports = new MessageService();