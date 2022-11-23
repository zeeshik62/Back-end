const mongoose = require('mongoose')

const studentsSchema = mongoose.Schema({
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
    },
    rollNum: {
        type: String,
        require: true
    },
    section: {
        type: String,
        require: true
    }
},
    { timestamps: true })

// module.exports = {
//     student: mongoose.model('studentUsers', studentsSchema),

// }
module.exports = mongoose.model('students', studentsSchema)