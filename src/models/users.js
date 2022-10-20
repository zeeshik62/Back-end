const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    userName: {
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

// module.exports = {
//     student: mongoose.model('studentUsers', userSchema),

// }
module.exports = mongoose.model('users', userSchema)