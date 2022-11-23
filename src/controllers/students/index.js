const express = require("express")
const router = express.Router()
const allStudents = require("./all-students")
const createTeam = require("./create-team")
const loginStudent = require("./login-student")
const registerStudent = require('./register-student')

module.exports = () => {
    router.get("/", allStudents)
    router.post("/login", loginStudent)
    router.post("/register", registerStudent)
    router.post("/create-team", createTeam)
    return router
}