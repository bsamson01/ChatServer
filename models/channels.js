const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema({
    name: String,
    description: String,
    members: [],
    type: Number,
    createdAt: Date,
});

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;
