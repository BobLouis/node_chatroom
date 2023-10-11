const express = require('express'); 
const app = express();
const http = require('http'); 
const server = http.createServer(app); 
const port = 5001; 

const { Server } = require('socket.io'); 
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // 當伺服器收到一個消息時...
    socket.on('message', (data) => {
        // 廣播這個消息到所有客戶端
        socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

