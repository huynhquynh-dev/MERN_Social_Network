const Users = require("../models/userModel");

const userController = {
  searchUser: async (req, res) => {
    try {
        const users = await User.find({ username: { $regex: req.query.username } })
            .limit(10)
            .select("fullname username avatar");

        res.json({users})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
  },
};

module.exports = userController;
