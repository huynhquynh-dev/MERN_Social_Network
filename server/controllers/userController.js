const Users = require("../models/userModel");

const userController = {
  searchUser: async (req, res) => {
    try {
        const users = await Users.find({ username: { $regex: req.query.username } })
            .limit(10)
            .select("fullname username avatar");

        res.json({users})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.param.id).select("-password");

      if(!user) return res.status(500).json({message: "User does not exist"})

      res.json({user})

    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
};

module.exports = userController;
