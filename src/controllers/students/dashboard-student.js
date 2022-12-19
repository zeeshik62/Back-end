const { StudentServices } = require('../../services')

module.exports = async (req, res) => {
    return await StudentServices.getDashboardData(req, res)
}