const { TeamServices } = require('../../services')

module.exports = async (req, res) => {
    return await TeamServices.createTeam(req, res)
}