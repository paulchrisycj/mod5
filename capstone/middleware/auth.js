const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
