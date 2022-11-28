const { TeamServices } = require('../../services')

module.exports = async (req, res) => {
    return await TeamServices.getTeam(req, res)
}