const { StudentServices } = require('../../services')

module.exports = async (req, res) => {
    return await StudentServices.createTeam(req, res)
}