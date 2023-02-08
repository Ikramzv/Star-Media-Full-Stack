import io from "socket.io-client";

const __prod__ = process.env.NODE_ENV === "production";

const SERVER_URL = __prod__
  ? "https://star-media.onrender.com"
  : "http://localhost:5000";

export const socket = io(SERVER_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default SERVER_URL;
