const { StudentServices } = require('../../services')

module.exports = async (req, res) => {
    return await StudentServices.signUp(req, res)
}