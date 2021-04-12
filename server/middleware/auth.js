const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ message: "Invalid authorization" });

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode)
      return res.status(400).json({ message: "Invalid authorization" });

    const user = await Users.findOne({_id: decode.id})

    req.user = user
    next()

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
