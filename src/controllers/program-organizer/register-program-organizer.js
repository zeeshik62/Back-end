const { ProgramOrganizerServices } = require('../../services')

module.exports = async (req, res) => {
    return await ProgramOrganizerServices.signUp(req, res)
}