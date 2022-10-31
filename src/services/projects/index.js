const mongoose = require("mongoose");
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
module.exports = {
    getProjects,
    addProject,
};
