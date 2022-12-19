const mongoose = require("mongoose");

const appliedProjectsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    projectId: {
        type: String,
        required: true,
    },
    supervisorId: {
        type: String,
        required: false
    },
    teamId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
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

module.exports = mongoose.model("appliedProjects", appliedProjectsSchema);