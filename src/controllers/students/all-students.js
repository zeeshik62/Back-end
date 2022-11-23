const { StudentServices } = require('../../services')

module.exports = async (req, res) => {
    return await StudentServices.getAllUsers(req, res)
}