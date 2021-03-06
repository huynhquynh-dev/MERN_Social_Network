const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {

    register: async (req, res) => {
        try {
            const {fullname, username, password, email, gender} = req.body

            let newUserName = username.toLowerCase().replace(/ /g, '')

            const user_name = await Users.findOne({username: newUserName})

            if (user_name)
                return res.status(400).json({message: "This user name already exists"})

            const user_email = await Users.findOne({email})
            if (user_email)
                return res.status(400).json({message: "This email already exists"})
            
            if (password.length < 6)
                return res.status(400).json({message: "Password must be at least 6 characters"})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                fullname, username: newUserName, password: passwordHash, email, gender
            })

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('REFRESH_TOKEN', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })

            await newUser.save()

            return res.json({
                message: "Registered successfully",
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body

            const user = await Users.findOne({email}).populate("followers following", "-password")
            if (!user) 
                return res.status(400).json({message: "This email does not exist"})

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) 
                return res.status(400).json({message: "Password is incorrect"})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('REFRESH_TOKEN', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })

            return res.json({
                message: "Login successfully",
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('REFRESH_TOKEN', {path: '/api/refresh_token'})

            return res.json({message: 'Logout successfully'})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const refresh_token = req.cookies.REFRESH_TOKEN
            if(!refresh_token)
                return res.status(400).json({message: "Please login now"})

            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async(error, result) => {
                if(error)
                    return res.status(400).json({message: "Please login now"})
                
                const user = await Users.findById(result.id)
                                        .select('-password')
                                        .populate('followers following', '-password')

                if(!user)
                    return res.status(400).json({message: "This does not exist"})

                const access_token = createAccessToken({id: result.id})

                return res.json({
                    access_token,
                    user
                })
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}

module.exports = authController