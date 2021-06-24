const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();
const server = app.listen(4000, _ => {
  console.log("Listening to Port 4000");
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", socket => {
  console.log("Made socket connection", socket.id);

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
