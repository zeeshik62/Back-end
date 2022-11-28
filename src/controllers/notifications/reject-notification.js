const { NotificationsServices } = require('../../services')

module.exports = async (req, res) => {
    return await NotificationsServices.rejectNotification(req, res)
}