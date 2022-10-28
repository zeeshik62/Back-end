const express = require("express")
const users = require("./user")
const projects = require("./projects")
const router = express.Router()

module.exports = () => {
    router.use("/user", users())
    router.use("/projects", projects())
    return router
}