const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');

app.use(cors());

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let mensajesEnviados = [];

io.on('connection', (socket) => {
    console.log(socket.id);

    for (let i = 0; i < mensajesEnviados.length; i++) {
        socket.emit('chat message', mensajesEnviados[i]);
    }

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        mensajesEnviados.push(msg);
        console.log(mensajesEnviados);
    });



    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
