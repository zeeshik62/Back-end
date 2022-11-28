const express = require("express")
const router = express.Router()
const acceptNotification = require("./accept-notification")
const getAllNotifications = require("./get-all-notifications")
const rejectNotification = require("./reject-notification")

module.exports = () => {
    router.get("/", getAllNotifications)
    router.put("/accept", acceptNotification)
    router.put("/reject", rejectNotification)
    return router
}