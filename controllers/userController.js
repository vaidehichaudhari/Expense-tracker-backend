const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).send({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(200).send({ message: "User registered successfully", success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedInUser = await User.findOne({ email });
    if (!loggedInUser) {
      return res.status(400).send({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, loggedInUser.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password", success: false });
    }

    const user = { _id: loggedInUser._id };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).send({
      message: "User logged in successfully",
      success: true,
      token
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('id name email');

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized', success: false });
    }

    res.status(200).json({
      message: 'User info fetched successfully',
      success: true,
      loggedUser: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch user info',
      success: false,
      error: error.message,
    });
  }
};



module.exports = {
    registerUser,
    LoginUser,
    getUserInfo
}