const Users = require("../models/userModel");

const userController = {
  searchUser: async (req, res) => {
    try {
        const users = await Users.find({ username: { $regex: req.query.username } })
            .limit(10)
            .select("fullname username avatar");

            return res.json({users})

    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password");

      if(!user) return res.status(400).json({message: "User does not exist"})

      return res.json({user})

    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  },
  updateUser: async (req, res) => {
    try {
      const { avatar, fullname, mobile, address, website, story, gender } = req.body

      if(!fullname) return res.status(400).json({message: "Please add your full name"})

      await Users.findOneAndUpdate({_id: req.user._id}, { avatar, fullname, mobile, address, website, story, gender})

      return res.json({message: "Update successfully"})

    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
};

module.exports = userController;
