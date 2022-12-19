const { ProgramOrganizerServices } = require('../../services')

module.exports = async (req, res) => {
    return await ProgramOrganizerServices.getDashboardData(req, res)
}