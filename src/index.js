const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const startNodeJsServer = async () => {
    try {
        app.use(cors({ origin: true }));
        app.use(bodyParser.json());
        app.listen(4000, () => console.log("server started on port 4000"));
    }
    catch (err) {
        console.log("error in starting server", err)
    }
}

startNodeJsServer();