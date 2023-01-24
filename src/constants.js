const __prod__ = process.env.NODE_ENV === "production";

const SERVER_URL = __prod__
  ? "https://star-media.onrender.com"
  : "http://localhost:5000";

export default SERVER_URL;
