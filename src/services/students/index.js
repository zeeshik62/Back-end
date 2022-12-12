const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Students = require("../../models/students");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const _student = await Students.findOne({ email, userType }).lean();
        if (_student) {
            bcrypt.compare(password, _student.password, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Password decryption error!",
                    });
                } else {
                    if (result) {
                        const loginToken = jwt.sign(
                            _student,
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
    } catch (error) {
        console.log("🚀 ~ file: index.js:41 ~ login ~ error", error)
        return res.status(500).json({
            message: `Server Internal Error ${error}`,
        });
    }
};
const signUp = async (req, res) => {
    try {
        const { name, email, password, section, rollNum, userType } = req.body;
        const _user = await Students.findOne({ email, rollNum }).lean();

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
                        const userModel = new Students({
                            _id: mongoose.Types.ObjectId(),
                            name,
                            email,
                            password: hash,
                            section,
                            rollNum,
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
                            userType
                        });
                    } else {
                        return res.status(403).json({ message: "Invalid Password!!" });
                    }
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const _students = await Students.find({}).lean();
        if (_students) {
            res.status(200).json({
                message: "All Students!",
                _students
            });
        } else {
            return res.status(404).json({
                message: "No user found!!",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};

module.exports = {
    login,
    signUp,
    getAllUsers,
};
