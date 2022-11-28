const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    flagId: {
        type: String,
        require: true
    },
    sender: {
        type: String,
        require: true
    },
    receiver: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('notifications', notificationSchema)