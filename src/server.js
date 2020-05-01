const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const app = express();

const server = require('http').createServer(app);

const routes = require('./routes');

const io = require("socket.io")(server, {
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});


io.on('connection', (socket) =>{
    console.log('a user connected')

    socket.on('chat.message', (data) => {
        console.log('Chat.message =>', data)
        io.emit('chat.message', data)
    })

    socket.on('disconnect', () => {
        console.log('diconnected')
    })
});


app.use(session({
    secret: "ssh, its a secret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 4000000
    }
}));

app.use( (req, res, next)=> {
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	next();
});

app.use(express.json());
app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

dotenv.config();

server.listen(process.env.SERVER_PORT, () => {
    console.log("Server it's open, access:" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT);
})
