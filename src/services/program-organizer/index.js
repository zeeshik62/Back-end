const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ProgramOrganizer = require("../../models/program-organizer");
const Project = require("../../models/projects");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const _user = await ProgramOrganizer.findOne({ email }).lean();
        if (_user) {
            bcrypt.compare(password, _user.password, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Password decryption error!",
                    });
                } else {
                    if (result) {
                        const loginToken = jwt.sign(
                            _user,
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
        console.log("🚀 ~ file: index.js:42 ~ login ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const signUp = async (req, res) => {
    try {
        const { userName, email, password, userType } = req.body;
        const _user = await ProgramOrganizer.findOne({ email }).lean();

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
                        const userModel = new ProgramOrganizer({
                            _id: mongoose.Types.ObjectId(),
                            name: userName,
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
        const organizer = await ProgramOrganizer.find({}).lean();
        if (organizer) {
            res.status(200).json({
                message: "All Students!",
                organizer
            });
        } else {
            return res.status(404).json({
                message: "No organizer found!!",
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: index.js:107 ~ getAllUsers ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const getDashboardData = async (req, res) => {
    try {
        const { id } = req.params
        const _projects = await Project.find({ organizerId: id }).lean()
        if (_projects) {
            res.status(200).json({
                message: "All Students!",
                _projects
            });
        } else {
            return res.status(201).json({
                message: "No projects found!!",
                _projects: []
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: index.js:132 ~ getDashboardData ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
module.exports = {
    login,
    signUp,
    getAllUsers,
    getDashboardData
};
