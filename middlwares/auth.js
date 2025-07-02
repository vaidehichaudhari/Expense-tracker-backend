const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // your user model

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader); // <--- debug
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token to verify:", token); // <--- debug

     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Or req.user = decoded.id if your token stores id
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};