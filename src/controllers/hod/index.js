const express = require("express")
const router = express.Router()
const getAllHod = require("./dashboard")
const loginHod = require("./login")
const registerHod = require('./register')

module.exports = () => {
    router.get("/:id", getAllHod)
    router.post("/login", loginHod)
    router.post("/register", registerHod)
    return router
}