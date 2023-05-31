const userService = require('../service/user-service');
const messageService = require('../service/message-service');
const events = require('events');
const emitter = new events.EventEmitter();

class UserController {
    async login(req, res, next) {
        try {
            const { username } = req.body;
            const userData = await userService.login(username);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 60 * 1000, httpOnly: true, secure: true}); // For https add flag ", secure: true"
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 60 * 1000, httpOnly: true, secure: true}); // For https add flag ", secure: true"
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getAllMessages(req, res, next) {
        try {
            const { recipient } = req.body;
            const messages = await messageService.getAllMessages(recipient);
            return res.json(messages);
        } catch (e) {
            next(e);
        }
    }

    async sendMessage(req, res, next) {
        try {
            const { sender, recipient, title, body } = req.body;
            const message = await messageService.createMessage(sender, recipient, title, body);
            emitter.emit(`newMessage_${recipient}`, message);
            return res.json(message);
        } catch (e) {
            next(e);
        }
    }

    async getNewMessage(req, res, next) {
        try {
            const { recipient } = req.body;
            emitter.once(`newMessage_${recipient}`, (message) => {
                return res.json(message);
            })
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController;