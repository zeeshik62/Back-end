const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const HOD = require("../../models/hod");
const Projects = require("../../models/projects");
const Supervisor = require("../../models/supervisor");
const Students = require("../../models/students");
const jwt = require("jsonwebtoken");
const appliedProjects = require("../../models/applied-projects");

const saltRounds = 10;

const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const _user = await HOD.findOne({ email }).lean();
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
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const signUp = async (req, res) => {
    try {
        const { userName, email, password, userType } = req.body;
        const _user = await HOD.findOne({ email });

        if (_user) {
            console.log("HOD Already Exists!");
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
                        const userModel = new HOD({
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
                            message: "HOD Signed Up Successfully!",
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
const getAllHod = async (req, res) => {
    try {
        const _projects = await Projects.find({}).lean()
        const _supervisors = await Supervisor.find({}).lean()
        const _students = await Students.find({}).lean()
        const _appliedProjects = await appliedProjects.find({}).lean()
        if (_projects) {
            res.status(200).json({
                message: "All HOD!",
                _projects, _supervisors, _students, _appliedProjects
            });
        } else {
            return res.status(404).json({
                message: "No user found!!",
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: index.js:108 ~ getAllHod ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
module.exports = {
    login,
    signUp,
    getAllHod
};
