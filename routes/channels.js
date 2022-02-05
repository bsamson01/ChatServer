const Channel = require('../models/channels');
const Message = require('../models/messages');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let channels = await Channel.find({ members: { $in : [req.body.user_id]} });
    res.send(channels);
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