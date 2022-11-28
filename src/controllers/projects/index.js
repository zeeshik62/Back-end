const express = require('express')
const router = express.Router()
const getProjects = require("./get-projects")
const addProject = require("./add-project")
const applyProject = require("./apply-project")
const appliedProject = require("./applied-project")

module.exports = () => {
    router.get("/", getProjects)
    router.post("/add-project", addProject)
    router.get("/apply-project", appliedProject)
    router.post("/apply-project", applyProject)
    return router
}