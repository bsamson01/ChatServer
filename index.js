const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { Server } = require("socket.io");
const database = require("./config/database");
const port = 4000;
const cors = require('cors');
const Message = require('./models/messages');
const User = require('./models/users');
const userAuth = require('./routes/users');
const chats = require('./routes/channels');

const app = express();
const httpServer = createServer(app);

var WebSocketServer = require('websocket').server;

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });


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
app.use('/user', userAuth);
app.use('/chats', chats);

wsServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false,
  cors: {
    origin: 'https://localhost:3000',
  }
});

app.get('/', (req, res) => {
  res.send('Server is on');
});

function originIsAllowed(origin) {
  return true;
}


wsServer.on('request', function(request) {

  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log("Request origin is not allowed");
    return;
  }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', async (data) => {

      const { message } = JSON.parse(data.utf8Data);
  
      let user = await User.findOne({ _id: message.senderId });
  
      if (user) {
        let newMessage = new Message({
          senderId: message.senderId,
          senderName: user.name,
          channelId: message.channelId,
          message: message.message,
          createdAt: Date.now()
        });
    
        newMessage.save().then(() =>  {
          connection.send(JSON.stringify({message: newMessage}));
        });
      }

    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

httpServer.listen(port, () => {
  console.log(`Socket listening on port ${port}`);
});
