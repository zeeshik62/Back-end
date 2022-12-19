const express = require("express")
const router = express.Router()
const getAllSupervisors = require("./all-supervisor")
const getAllRequests = require("./all-requests")
const loginSupervisor = require("./login-supervisor")
const registerSupervisor = require('./register-supervisor')
const dashboardSupervisor = require('./dashboard-supervisor')
const updateStageSupervisor = require('./update-stage-supervisor')

module.exports = () => {
    router.get("/", getAllSupervisors)
    router.post("/login", loginSupervisor)
    router.post("/register", registerSupervisor)
    router.get("/requests", getAllRequests)
    router.get("/:id", dashboardSupervisor)
    router.put("/update-stage", updateStageSupervisor)
    return router
}