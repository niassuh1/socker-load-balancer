import http from "http";
import express from "express";
import { Server } from "socket.io";
import { publisher, subscriber } from "./redis/redis-client";
import { createAdapter } from "@socket.io/redis-adapter";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({
    server: process.env.SERVER || 0,
  });
});

io.on("connection", (socket) => {
  socket.on("message", async (data) => {
    console.log("message:", data);
    socket.broadcast.emit("message", data);
  });
});

Promise.all([publisher.connect(), subscriber.connect()]).then(() => {
  io.adapter(createAdapter(publisher, subscriber));
  server.listen(PORT, async () => {
    console.log("Server listening on port", PORT);
  });
});
