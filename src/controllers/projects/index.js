const express = require('express')
const router = express.Router()
const getProjects = require("./get-projects")
const addProject = require("./add-project")


module.exports = () => {
    router.get("/", getProjects)
    router.post("/add-project", addProject)
    return router
}