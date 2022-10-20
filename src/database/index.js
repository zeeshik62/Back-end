require('dotenv').config()
const mongoose = require("mongoose")

module.exports = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, () => {
            console.log("Connect to DataBase");
        })
    } catch (error) {
        console.log(error);
    }
}
