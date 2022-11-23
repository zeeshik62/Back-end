const express = require("express")
const router = express.Router()
const loginProgramOrganizer = require("./login-program-organizer")
const registerProgramOrganizer = require('./register-program-organizer')

module.exports = () => {
    router.post("/login", loginProgramOrganizer)
    router.post("/register", registerProgramOrganizer)
    return router
}