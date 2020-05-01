const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();

const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

module.exports = server;