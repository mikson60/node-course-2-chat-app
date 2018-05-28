const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Badass Secret Chat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A badass approaches'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Sent');
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