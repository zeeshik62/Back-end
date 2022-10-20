const { UserServices } = require('../../services')

module.exports = async (req, res) => {
    return await UserServices.signUp(req, res)
}