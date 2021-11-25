import { Server, Socket } from 'socket.io';

module.exports = (server: Server, client: Socket): void => {    
    const onPing = (time: number): void => {
        const deltaTime = Date.now() - time;
        client.emit('user:chat-message', 'pong: ' + deltaTime.toString() + 'ms');
    }
    
    const onChatMessage = (msg: string): void => {
        server.emit('user:chat-message', msg);
    }

    const onRoomConnection = (roomName: string): void => {
        client.join(roomName);
    }
  
    client.on("user:ping", onPing);
    client.on("user:chat-message", onChatMessage);
    client.on("user:connect-room", onRoomConnection);
}