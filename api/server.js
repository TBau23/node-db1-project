const express = require("express");

const AccountRouter = require("../routers/accountRouter");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'Server is live...'})
})

module.exports = server;
