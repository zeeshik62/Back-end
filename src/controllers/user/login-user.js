const { UserServices } = require('../../services')

module.exports = async (req, res) => {
    return await UserServices.login(req, res)
}