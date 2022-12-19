const { SupervisorServices } = require('../../services')

module.exports = async (req, res) => {
    return await SupervisorServices.getChatData(req, res)
}