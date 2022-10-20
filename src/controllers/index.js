const express = require("express")
const users = require("./user")
const router = express.Router()
module.exports = () => {
    router.use("/user", users())
    return router
}