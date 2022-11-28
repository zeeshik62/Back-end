const { ProjectServices } = require('../../services')

module.exports = async (req, res) => {
    return await ProjectServices.applyProject(req, res)
}