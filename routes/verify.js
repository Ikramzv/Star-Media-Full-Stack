const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  const token = accessToken && accessToken.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized user");
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).send("Error while verifying user");
    req.user = user;
    next();
  });
}

module.exports = verifyToken;
