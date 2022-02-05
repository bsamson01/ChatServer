const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const cors = require('cors');
require("dotenv").config();

const database = require("./config/database");
const userAuth = require('./routes/users');
const chats = require('./routes/channels');

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 4000;

try {
  mongoose.connect(
    database.connectionUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("Could not connect to database");
}

app.use(cors());
app.use(express.json());
app.use('/api/user', userAuth);
app.use('/api/chats', chats);

app.get('/api', (req, res) => {
  res.send('Brandon\'s Chat Web Server Api is online');
});

app.get('/', (req, res) => {
  res.redirect('/api');
});

httpServer.listen(port, () => {
  console.log(`Socket listening on port ${port}`);
});
