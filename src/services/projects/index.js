const mongoose = require("mongoose");
const AppliedProjects = require("../../models/applied-projects");
const Project = require("../../models/projects");

const getProjects = async (req, res) => {
    try {
        const _projects = await Project.find({}).lean()
        res.status(201).json({
            projects: _projects
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};
const addProject = async (req, res) => {
    try {
        const { projectDescription, projectName, stackName, imageSrc } = req.body;
        const _project = await Project.findOne({ name: projectName, stack: stackName }).lean();

        if (_project) {
            return res.status(403).json({ message: "Project Already Exists!" });
        } else {
            const _projectObject = new Project({
                _id: mongoose.Types.ObjectId(),
                name: projectName,
                imagePath: imageSrc,
                description: projectDescription,
                stack: stackName,
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
        const { _id, teamId } = req.body;
        const _applyForProject = new AppliedProjects({
            _id: mongoose.Types.ObjectId(),
            projectId: _id,
            teamId,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        })
        await _applyForProject.save()
        res.status(201).json({
            message: 'request send successfully!'
        })
    } catch (error) {
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
