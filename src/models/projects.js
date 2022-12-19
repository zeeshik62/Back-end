
const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    organizerId: {
        type: String,
        required: true
    },
    supervisorName: {
        type: String,
        required: true
    },
    supervisorId: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true });

module.exports = mongoose.model("projects", projectsSchema);