const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: String,
    senderName: String,
    channelId: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
