const mongoose = require("mongoose");
const Teams = require("../../models/teams");
const Notifications = require("../../models/notification");
const Students = require("../../models/students");

const createTeam = async (req, res) => {
    try {
        const { teamMakerName, teamMembers } = req.body;
        const _team = new Teams({
            _id: mongoose.Types.ObjectId(),
            teamMakerName,
            teamMembers,
            stage: 'initial',
            status: 'pending'
        })
        let allPromises = []
        teamMembers.forEach((element) => {
            allPromises.push({
                _id: mongoose.Types.ObjectId(),
                flagId: _team._id,
                sender: teamMakerName,
                receiver: element.id,
                type: 'chooseTeam',
                status: 'pending'
            })
        })
        await _team.save()
        await Notifications.insertMany(allPromises)
        res.status(200).json({
            message: "Request sent to your team!!",
        });
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 142 ~ createTeam ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
        });
    }
};
const getTeam = async (req, res) => {
    try {
        const { id } = req.query;
        // will find team members of given id
        const _teams = await Teams.find({ teamMakerName: id }).lean()
        let _teamMember = null
        let array = []
        // if team maker name is found if condition will be true otherwise else
        if (_teams.length > 0) {
            _teamMember = _teams
        } else {
            _teamMember = await Teams.find({ teamMembers: { $elemMatch: { "id": id } } })
        }
        // find the team maker's & team members details 
        if (_teamMember.length > 0) {
            let teamMakerData = await Students.findById(_teamMember[0]?.teamMakerName).lean()
            await Promise.all(_teamMember[0].teamMembers.map(async (el) => {
                let _student = await Students.findById(el.id).lean()
                array.push({ ..._student, status: el.status, teamCreatedAt: _teamMember[0].createdAt, teamId: _teamMember[0]._id })
            }))
            array.push({ ...teamMakerData, status: true, teamCreatedAt: _teamMember[0].createdAt, teamId: _teamMember[0]._id })
            // send back to frontend success message & the end result.
            res.status(200).json({
                message: "success",
                teamData: array,
                teamStatus: _teamMember[0].status
            });
        } else {
            res.status(200).json({
                message: "success",
                teamData: [],
                teamStatus: null
            });
        }

    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 176 ~ getTeam ~ error", error)
        return res.status(500).json({
            message: "Server Internal Error",
            error
        });
    }
};
module.exports = {
    createTeam,
    getTeam,
};
