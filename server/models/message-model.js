const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    title: { type: String, required: false, default: '' },
    body: { type: String, required: false, default: '' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', MessageSchema);