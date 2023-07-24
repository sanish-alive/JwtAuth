const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const jwtSecret = process.env.JWTKEY

exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if (password.length < 6) {
        return res.status(400)
        .json({ message: "Password less than 6 characters."})
    }
    const existUsername = await User.findOne({ username })
    if (existUsername) {
        return res.status(400).json({
            message: "Username already exit"
        })
    }
    try {
        bcrypt.hash(password, 10)
        .then(async (hash) => {
            await User.create({
                username,
                password: hash,
            }).then(user => {
                const maxAge = 3 * 60 * 60
                res.status(201).json({
                    message: "User successfully created",
                    userid: user.id,
                    username: user.username,
                    role: user.role

                })
            })
        })
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong. Please try again."
        })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) {
        return res.status(400).json({
            message: "Username and Password not present."
        })
    }

    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found."
            })
        } else {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60
                    const token = jwt.sign(
                        { id: user.id,
                            username: user.username,
                            role: user.role                        
                        },
                        jwtSecret,
                        { expiresIn: maxAge}
                    )
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000
                    })
                    res.status(201).json({
                        message: "User is successsfully login",
                        userid: user.id,
                        username: user.username,
                        role: user.role
                    })
                } else {
                    res.status(400).json({
                        message: "Login not successful.",
                        error: "Password is incorrect."
                    })
                }
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong. Try Again."
        })
    }
}