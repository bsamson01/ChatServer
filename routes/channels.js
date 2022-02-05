const { Channel, Message, User } = require('../models');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let channels = await Channel.find({ members: { $in : [req.body.user_id]} });
    res.send(channels);
});

router.post('/send-message', async (req, res) => {
    let message = req.body.message;

    if (!message) {
        return res.status(400).send({
            message: 'Message is required'
        });
    }

    let user = await User.findOne({ _id: message.senderId });

    if (!user) {
        return res.status(400).send({
            message: 'User is not found'
        });
    } else {
        let newMessage = new Message({
            senderId: message.senderId,
            senderName: message.senderName,
            channelId: message.channelId,
            message: message.message,
            createdAt: Date.now()
        });

        newMessage.save().then(() => {
            res.send(newMessage);
        });
    }
});

router.post('/create', async (req, res) => {

    let channel = await Channel.findOne({ members: req.body.user_ids, type: req.body.type });

    if (!channel) { 
        channel = new Channel({
            name: req.body.name,
            description: req.body.description,
            members: req.body.user_ids,
            type: req.body.type
        });

        await channel.save();
    }
    res.send(channel);
});

router.post('/messages', async (req, res) => {
    let messages = await Message.find({ channelId: req.body.channel_id });
    res.send(messages);
});

module.exports = router;