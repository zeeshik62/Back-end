require('dotenv').config()
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const routes = require("./controllers")
const DbConnection = require("./database")
const app = express();
const PORT = process.env.PORT || 3001

const startNodeJsServer = async () => {
    try {
        app.use(cors({ origin: true }));
        app.use(bodyParser.json());
        app.use(routes())
        await DbConnection()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    }
    catch (err) {
        console.log("error in starting server", err)
    }
}

startNodeJsServer();