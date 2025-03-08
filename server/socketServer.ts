import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("A user connected");
    //listen for notification event from frontend
    socket.on("notification", (data) => {
      //broadcast the notification to all connected clients(admin dashboard)
      io.emit("newNotification", data);
    });
    socket.on("Disconnected", () => {
      console.log("A user disconnected");
    });
  });
};
