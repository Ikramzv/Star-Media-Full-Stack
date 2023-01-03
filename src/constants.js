const __prod__ = process.env.NODE_ENV === "production";

const SERVER_URL = __prod__
  ? process.env.REACT_PUBLIC_SERVER_URL
  : "http://localhost:5000";

export default SERVER_URL;
