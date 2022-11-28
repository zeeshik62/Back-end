const express = require("express")
const router = express.Router()
const allStudents = require("./all-students")
const loginStudent = require("./login-student")
const registerStudent = require('./register-student')

module.exports = () => {
    router.get("/", allStudents)
    router.post("/login", loginStudent)
    router.post("/register", registerStudent)
    return router
}