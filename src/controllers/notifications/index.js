const express = require("express")
const router = express.Router()
const acceptNotification = require("./accept-notification")
const getAllNotifications = require("./get-all-notifications")
const rejectNotification = require("./reject-notification")
const announcementNotification = require("./announcement-notification")
const getAnnouncement = require("./get-announcement")
const getChatDataSupervisor = require("./chat-data")

module.exports = () => {
    router.get("/", getAllNotifications)
    router.put("/accept", acceptNotification)
    router.put("/reject", rejectNotification)
    router.post("/announcement", announcementNotification)
    router.get("/announcement", getAnnouncement)
    router.get("/get-chat", getChatDataSupervisor)
    return router
}