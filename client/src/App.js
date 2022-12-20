import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    socket.off("receive").on("receive", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  // //
  // useEffect(() => {
  // socket.on("receive", (data) => {
  //   console.log(data);
  // });
  //   // return () => socket.emit("end");
  // }, [socket]);

  //
  const send = () => {
    socket.emit("chat message", message);
  };
  return (
    <div className="App">
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={send}>Send message</button>
      <div>Yoo wassup</div>
      <br />
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
}

export default App;
