const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

// const server = http.createServer((req, res) => {

// });
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'jens',
        text: 'Yo, wassup',
        createdAt: 123
    });

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});