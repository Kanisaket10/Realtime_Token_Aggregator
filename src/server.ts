import http from "http";
import app from "./app";
import { env } from "./config/env";
import { initSocket } from "./websocket/socket";

const server = http.createServer(app);

initSocket(server);

server.listen(env.port, () => {
  console.log(`[server] running on port ${env.port}`);
});

