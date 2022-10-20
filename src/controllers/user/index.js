const express = require("express")
const router = express.Router()
const loginUser = require("./login-user")
const registerUser = require('./register-user')

module.exports = () => {
    router.post("/login", loginUser)
    router.post("/register", registerUser)
    return router
}