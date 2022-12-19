const express = require("express")
const programOrganizer = require("./program-organizer")
const projects = require("./projects")
const students = require("./students")
const supervisor = require("./supervisor")
const users = require("./user")
const teams = require("./teams")
const hod = require("./hod")
const notification = require("./notifications")
const router = express.Router()

module.exports = () => {
    router.use("/notifications", notification())
    router.use("/program-organizers", programOrganizer())
    router.use("/projects", projects())
    router.use("/students", students())
    router.use("/supervisors", supervisor())
    router.use("/teams", teams())
    router.use("/user", users())
    router.use("/hod", hod())
    return router
}