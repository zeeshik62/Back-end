const express = require("express")
const programOrganizer = require("./program-organizer")
const projects = require("./projects")
const students = require("./students")
const supervisor = require("./supervisor")
const users = require("./user")
const router = express.Router()

module.exports = () => {
    router.use("/program-organizers", programOrganizer())
    router.use("/projects", projects())
    router.use("/students", students())
    router.use("/supervisors", supervisor())
    router.use("/user", users())
    return router
}