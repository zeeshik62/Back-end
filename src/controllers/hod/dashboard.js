const { HodServices } = require('../../services')

module.exports = async (req, res) => {
    return await HodServices.getAllHod(req, res)
}