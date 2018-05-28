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

    // Welcome messages
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Arena'
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'A challenger approaches',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {              // send message to everybody
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {   // send message to everybody except the sender socket
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});