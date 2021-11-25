import * as express from "express";
import { createServer, Server as HttpServer } from 'http';
import * as SocketIO from 'socket.io';
import Handler from "./handlers/handler";

const registerUserHander: Handler = require('./handlers/UserHandler');

class App {
    public readonly PORT: number = 8000;
    
    public app: express.Application;
    public server: HttpServer;
    
    private socketIO: SocketIO.Server;

    constructor() {
        this.routes();
        this.sockets();
        this.listen();
    }

    routes() {
        this.app = express();
        this.app.route("/").get((req, res) => {
            res.sendFile(__dirname + '/index.html');
        });
    }

    private sockets(): void {
        this.server = createServer(this.app);
        this.socketIO = new SocketIO.Server(this.server);
    }

    private listen(): void {

        this.socketIO.on('connection', (socket: SocketIO.Socket) => {
            console.log('a user connected');

            registerUserHander(this.socketIO, socket);

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

export default new App();