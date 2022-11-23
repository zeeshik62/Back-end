const express = require("express")
const router = express.Router()
const loginSupervisor = require("./login-supervisor")
const registerSupervisor = require('./register-supervisor')

module.exports = () => {
    router.post("/login", loginSupervisor)
    router.post("/register", registerSupervisor)
    return router
}