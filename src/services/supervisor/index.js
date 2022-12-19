const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Supervisor = require("../../models/supervisor");
const AppliedProjects = require("../../models/applied-projects");
const Projects = require("../../models/projects");
const Students = require("../../models/students");
const jwt = require("jsonwebtoken");
const Teams = require("../../models/teams");

const saltRounds = 10;

const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const _user = await Supervisor.findOne({ email }).lean();
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
        const _user = await Supervisor.findOne({ email }).lean();

        if (_user) {
            console.log("Supervisor Already Exists!");
            return res.status(403).json({ message: "Supervisor Already Exists!" });
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log("Password decryption error!");
                    return res.status(500).json({
                        message: "Password decryption error!",
                    });
                } else {
                    if (hash) {
                        const userModel = new Supervisor({
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
                            message: "Supervisor Signed Up Successfully!",
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
const getAllSupervisor = async (req, res) => {
    try {
        const _supervisor = await Supervisor.find({}).lean();
        if (_supervisor) {
            res.status(200).json({
                message: "All supervisor!",
                _supervisor
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
const getAllRequests = async (req, res) => {
    try {
        const { userId } = req.query;
        const _appliedProjects = await AppliedProjects.find({ supervisorId: userId }).lean();
        if (_appliedProjects) {
            let _requests = []
            await Promise.all(_appliedProjects.map(async (el) => {
                let _projectDetails = await Projects.findById(el.projectId).lean()
                let _teamDetails = await Teams.findById(el.teamId).lean()
                let makerDetails = []
                let _maker = await Students.findById(_teamDetails.teamMakerName).lean()
                makerDetails.push(_maker)
                await Promise.all(_teamDetails.teamMembers.map(async (el) => {
                    let _member = await Students.findById(el.id).lean()
                    makerDetails.push(_member)
                }))
                _requests.push({ projectDetails: _projectDetails, teamDetails: _teamDetails })
            }
            ))
            res.status(200).json({
                message: "All supervisor!",
                _requests
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
const getDashboardData = async (req, res) => {
    try {
        const { id } = req.params
        const _projects = await Projects.find({ supervisorId: id }).lean()
        if (_projects) {
            res.status(200).json({
                message: "success!!",
                _projects
            });
        } else {
            return res.status(201).json({
                message: "No projects found!!",
                _projects
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const updateStage = async (req, res) => {
    try {
        const { values } = req.body.params
        await Projects.findOneAndUpdate(values._id, { stage: stageNumber(values.stage) }).lean()
        res.status(200).json({
            message: "stage updated!"
        });
    } catch (error) {
        console.log("🚀 ~ file: index.js:179 ~ updateStage ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const getChatData = async (req, res) => {
    try {
        const { values } = req.query
        let arr = []
        await Promise.all(values.map(async (student) => {
            const _student = await Students.findById(student.studentId).lean()
            arr.push(_student)
        }))
        // await Projects.findOneAndUpdate(values._id, { stage: stageNumber(values.stage) }).lean()
        res.status(200).json({
            message: "stage updated!",
            studentDetails: arr
        });
    } catch (error) {
        console.log("🚀 ~ file: index.js:179 ~ updateStage ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};

const stageNumber = (params) => {
    const obj = {
        first: 'second',
        second: 'third',
        third: 'third'
    }
    return obj[params]
}
module.exports = {
    login,
    signUp,
    getAllSupervisor,
    getAllRequests,
    getDashboardData,
    updateStage,
    getChatData
};
