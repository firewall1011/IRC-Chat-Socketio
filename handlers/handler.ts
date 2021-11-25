import * as SocketIO from "socket.io";

export default interface Handler {
    (socketIO: SocketIO.Server, clientSocket: SocketIO.Socket): void;
}