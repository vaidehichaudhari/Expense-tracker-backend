const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).send({ message: "Unauthorized", success: false });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECREATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token", success: false });
  }
};
