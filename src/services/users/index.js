const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = require("../../models/users");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const _user = await Users.findOne({ email, userType });
        if (_user) {
            bcrypt.compare(password, _user.password, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Password decryption error!",
                    });
                } else {
                    if (result) {
                        const loginToken = jwt.sign(
                            { ..._user.toJSON() },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "8h" }
                        );
                        res.status(200).json({
                            message: "User Login Successfully!",
                            token: loginToken,
                            userType,
                        });
                    } else {
                        return res.status(403).json({ message: "Invalid Password!!" });
                    }
                }
            });
        } else {
            return res.status(404).json({
                message: "No user found!!",
            });
        }
    } catch (error) { }
};
const signUp = async (req, res) => {
    try {
        const { userName, email, password, userType } = req.body;
        console.log("🚀 ~ file: index.js ~ line 18 ~ signUp ~ req.body", req.body);

        const _user = await Users.findOne({ email });

        if (_user) {
            console.log("User Already Exists!");
            return res.status(403).json({ message: "User Already Exists!" });
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log("Password decryption error!");
                    return res.status(500).json({
                        message: "Password decryption error!",
                    });
                } else {
                    if (hash) {
                        const userModel = new Users({
                            _id: mongoose.Types.ObjectId(),
                            userName,
                            email,
                            password: hash,
                            userType,
                        });
                        await userModel.save();
                        const token = jwt.sign(
                            { ...userModel.toJSON() },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "8h" }
                        );
                        res.status(200).json({
                            message: "User Signed Up Successfully!",
                            token,
                        });
                    } else {
                        return res.status(403).json({ message: "Invalid Password!!" });
                    }
                }
            });
        }
    } catch (error) { }
};
module.exports = {
    login,
    signUp,
};
