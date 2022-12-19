const { NotificationsServices } = require('../../services')

module.exports = async (req, res) => {
    return await NotificationsServices.getAnnouncement(req, res)
}