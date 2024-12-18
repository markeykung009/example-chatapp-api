const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"],
  },
});

// เมื่อมีการเชื่อมต่อ
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // รับข้อความจาก client
  socket.on("send_message", (data) => {
    console.log(data);
    io.emit("receive_message", data); // ส่งข้อความไปยังผู้ใช้ทุกคน
  });

  // เมื่อผู้ใช้ตัดการเชื่อมต่อ
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});