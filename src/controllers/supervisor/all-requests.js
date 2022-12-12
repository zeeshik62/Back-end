const { SupervisorServices } = require('../../services')

module.exports = async (req, res) => {
    return await SupervisorServices.getAllRequests(req, res)
}