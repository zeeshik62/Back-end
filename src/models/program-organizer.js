const mongoose = require('mongoose')

const programOrganizerSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        require: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('programOrganizer', programOrganizerSchema)