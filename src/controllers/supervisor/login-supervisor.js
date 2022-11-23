const { SupervisorServices } = require('../../services')

module.exports = async (req, res) => {
    return await SupervisorServices.login(req, res)
}