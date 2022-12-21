const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3001", "http://localhost:3002"],
//     methods: ["GET", "POST"],
//   },
// });
const messageRoute = require("./routes/message");

app.use("/", messageRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const io = require("./socket").init(server);

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);

  socket.on("chat message", (msg) => {
    socket.emit("receive", msg);
    // console.log("message: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected " + socket.id);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// module.exports = { io };
