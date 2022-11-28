const Notification = require("../../models/notification");
const Student = require("../../models/students");
const Teams = require("../../models/teams");
const { ObjectId } = require('mongoose').Types

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
            flag.length == 0 && await Teams.findByIdAndUpdate(values.flagId, { status: 'accepted' }).lean()
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
        console.log("🚀 ~ file: index.js ~ line 74 ~ rejectNotification ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
module.exports = {
    acceptNotification,
    getAllNotifications,
    rejectNotification
};
