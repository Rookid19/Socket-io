const io = require("../socket");

exports.send_message = async (req, res) => {
  // //   console.log("hiii");
  // //   socket.emit("chat message", "Wassup bro");
  // io.on("connection", (socket) => {
  //   // send a message to the client
  //   // socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
  // socket.emit("chat message", "Wassup bro");

  io.getIO().emit("receive", "wossop");

  // receive a message from the client
  // socket.on("hello from client", (...args) => {
  //   // ...
  // });
  // });
  res.status(200).send("done");
};
