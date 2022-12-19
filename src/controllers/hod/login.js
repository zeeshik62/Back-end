const { HodServices } = require('../../services')

module.exports = async (req, res) => {
    return await HodServices.login(req, res)
}