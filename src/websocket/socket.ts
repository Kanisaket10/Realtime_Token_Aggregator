import { Server } from "socket.io";
import http from "http";
import { startTokenUpdater } from "./tokenUpdater";

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("[socket] client connected", socket.id);

    // simple test event
    socket.emit("connected", {
      message: "WebSocket connection established"
    });

    socket.on("disconnect", () => {
      console.log("[socket] client disconnected", socket.id);
    });
  });

  startTokenUpdater(io);
  
  return io;
}
