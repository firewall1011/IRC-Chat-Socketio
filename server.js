const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const socketio = new Server(httpServer);

app.use(express.static(__dirname));

app.get('/', (req, res) =>
{
	res.sendFile('index.html');
});

socketio.on('connection', (socket) => 
{
	console.log('a user connected');
	
	socket.on('chat message', (msg) => 
	{
		socketio.emit('chat message', msg);
	});
});

httpServer.listen(3000, () => 
{
	console.log('listening on *:3000');
});