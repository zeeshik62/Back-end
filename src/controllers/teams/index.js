const express = require("express")
const router = express.Router()
const createTeam = require("./create-team")
const getTeam = require('./get-team')

module.exports = () => {
    router.post("/create-team", createTeam)
    router.get("/get-team", getTeam)
    return router
}