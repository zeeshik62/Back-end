const { ProjectServices } = require('../../services')

module.exports = async (req, res) => {
    return await ProjectServices.addProject(req, res)
}