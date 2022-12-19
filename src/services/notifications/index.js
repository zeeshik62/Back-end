const Announcement = require("../../models/announcement");
const Notification = require("../../models/notification");
const Student = require("../../models/students");
const Teams = require("../../models/teams");
const Projects = require("../../models/projects");
const { ObjectId } = require('mongoose').Types
const mongoose = require("mongoose");

const getAllNotifications = async (req, res) => {
    try {
        const { id } = req.query;
        const _notifications = await Notification.find({ receiver: id, status: "pending" }).lean();
        let arr = []
        if (_notifications.length > 0) {
            await Promise.all(_notifications.map(async (el) => {
                const _sender = await Student.findOne(ObjectId(el.sender)).lean()
                arr.push({ ..._sender, ...el })
            }))
            res.status(200).json({
                message: "All Students!",
                _notifications: arr
            });
        } else {
            return res.status(201).json({
                message: "No notification found!!",
                _notifications: arr
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 25 ~ getAllNotifications ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};

const acceptNotification = async (req, res) => {
    try {
        const { values } = req.body;
        const _notifications = await Notification.findById(values._id).lean();
        if (_notifications) {
            await Notification.findByIdAndUpdate(values._id, { status: "accepted" }).lean()
            const _teams = await Teams.findById(values.flagId).lean()
            await Promise.all(_teams.teamMembers.map(async (el) => {
                let _teamMembers = _teams.teamMembers;
                _teamMembers.forEach((element, index) => {
                    if (element.id === values.receiver) {
                        _teamMembers[index].status = true;
                    }
                });
                await Teams.findByIdAndUpdate(values.flagId, { teamMembers: _teamMembers }).lean()
            }))
            let flag = _teams.teamMembers.filter(el => !el.status)
            if (flag.length == 0) {
                await Teams.findByIdAndUpdate(values.flagId, { status: 'accepted' }).lean()
                await Projects.findByIdAndUpdate(values.projectId, { isCompleted: true }).lean()
            }
            res.status(200).json({
                message: "Notification accepted successfully!",
            });
        } else {
            return res.status(201).json({
                message: "No notification found!!",
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 47 ~ acceptNotification ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};

const rejectNotification = async (req, res) => {
    try {
        const { values } = req.body;
        const _notifications = await Notification.findById(values._id).lean();
        if (_notifications) {
            await Notification.findByIdAndUpdate(values._id, { status: "rejected" }).lean()
            res.status(200).json({
                message: "Notification rejected successfully!",
            });
        } else {
            return res.status(404).json({
                message: "No notification found!!",
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 87 ~ rejectNotification ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const announcement = async (req, res) => {
    try {
        const { description, userId, fileName, studentList, supervisorList } = req.body;
        const _announcement = new Announcement({
            _id: mongoose.Types.ObjectId(),
            announcement: true,
            sender: userId,
            type: 'announcement',
            text: description,
            fileName,
            status: 'pending',
            studentList,
            supervisorList
        })
        await _announcement.save()
        res.status(200).json({
            message: "Announcement send successfully!",
        });
    } catch (error) {
        console.log("🚀 ~ file: index.js:108 ~ announcement ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const getAnnouncement = async (req, res) => {
    try {
        const _ann = await Announcement.find({ status: 'pending' })
        res.status(200).json({
            message: "Announcement successfully!",
            _ann
        });
    } catch (error) {
        console.log("🚀 ~ file: index.js:108 ~ announcement ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
module.exports = {
    acceptNotification,
    getAllNotifications,
    rejectNotification,
    announcement,
    getAnnouncement
};
