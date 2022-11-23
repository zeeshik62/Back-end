const mongoose = require('mongoose')

const teamsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    teamMakerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"
    }],
},
    { timestamps: true })

module.exports = mongoose.model('teams', teamsSchema)