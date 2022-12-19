const mongoose = require('mongoose')

const announcementSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    sender: {
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
    },
    text: {
        type: String,
        require: false
    },
    fileName: {
        type: String,
        require: false
    },
    announcement: {
        type: Boolean,
        require: false
    },
    studentList: {
        type: Array,
        require: false
    },
    supervisorList: {
        type: Array,
        require: false
    },
},
    { timestamps: true })

module.exports = mongoose.model('announcement', announcementSchema)