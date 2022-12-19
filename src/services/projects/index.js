const mongoose = require("mongoose");
const AppliedProjects = require("../../models/applied-projects");
const Project = require("../../models/projects");
const Notification = require("../../models/notification");
const Teams = require("../../models/teams");
const Students = require("../../models/students");

const getProjects = async (req, res) => {
    try {
        const _projects = await Project.find({}).lean()
        let finalData = []
        let teamsData = []
        await Promise.all(_projects.map(async (project) => {
            const _appliedProjects = await AppliedProjects.findOne({ projectId: project._id.toString() }).lean()
            let teamId = _appliedProjects?.teamId
            if (teamId) {
                const _team = await Teams.findById(teamId).lean()
                let _teamMaker = await Students.findById(_team.teamMakerName).lean()
                teamsData.push(_teamMaker?.name)
                await Promise.all(_team.teamMembers.map(async (member) => {
                    let _member = await Students.findById(member.id).lean()
                    teamsData.push(_member?.name)
                }))
                let obj = { ...project, teamsData }
                finalData.push(obj)
            } else {
                finalData.push(project)
            }
        }))

        res.status(201).json({
            projects: finalData
        })

    } catch (error) {
        console.log("🚀 ~ file: index.js:31 ~ getProjects ~ error", error)
        res.status(500).json({
            error: error.message
        })
    }
};
const addProject = async (req, res) => {
    try {
        const { projectDescription, projectName, stackName, supervisorName, supervisorId, imageSrc, userId } = req.body;
        const _project = await Project.findOne({ name: projectName, stack: stackName }).lean();

        if (_project) {
            return res.status(403).json({ message: "Project Already Exists!" });
        } else {
            const _projectObject = new Project({
                _id: mongoose.Types.ObjectId(),
                name: projectName,
                imagePath: imageSrc,
                description: projectDescription,
                organizerId: userId,
                stack: stackName,
                stage: 'initial',
                supervisorName,
                supervisorId,
                isCompleted: false,
                createdAt: new Date()
            })
            await _projectObject.save()
            res.status(201).json({
                message: 'Project Added Successfully!'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};
const applyProject = async (req, res) => {
    try {
        const { _id, userId, teamId, organizerId: supervisorId } = req.body;
        const _applyForProject = new AppliedProjects({
            _id: mongoose.Types.ObjectId(),
            projectId: _id,
            teamId,
            status: "pending",
            supervisorId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const _notification = new Notification({
            _id: mongoose.Types.ObjectId(),
            flagId: teamId,
            sender: userId,
            receiver: supervisorId,
            projectId: _id,
            type: 'project request',
            status: 'pending'
        })
        await _applyForProject.save()
        await _notification.save()
        res.status(201).json({
            message: 'request send successfully!'
        })
    } catch (error) {
        console.log("🚀 ~ file: index.js:75 ~ applyProject ~ error", error)
        res.status(500).json({
            error: error.message
        })
    }
};
const getAppliedProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.query;
        const _project = await AppliedProjects.findOne({ projectId, teamId }).lean()
        res.status(200).json({
            message: 'apply project',
            _project
        })
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 76 ~ getAppliedProject ~ error", error)
        res.status(500).json({
            error: error.message
        })
    }
};
module.exports = {
    applyProject,
    addProject,
    getProjects,
    getAppliedProject
};
