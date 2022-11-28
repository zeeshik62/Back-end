const mongoose = require('mongoose')

const teamsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    teamMakerName: {
        type: String,
        require: true
    },
    teamMembers: [{
        id: String,
        status: Boolean
    }],
    status: {
        type: String,
        require: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('teams', teamsSchema)