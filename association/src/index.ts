import { createServer } from 'http';

import "reflect-metadata";
import * as express from 'express';
import { json } from "express";
import { createClient } from 'redis'
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Server, ServerOptions } from 'socket.io'
import initConnection from './routes'

const app = express()

// using various middlewares
app.use(json())
app.use(cors())
app.use(morgan("dev"))

// creating an http server to use with socket.io
const server = createServer(app);

// initialising socket.io server
const options: Partial<ServerOptions> = {
    path: "/socket",
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
};

const socket = new Server(server, options);

const redisClient = createClient({
    url: "http://redis:6379"
});

initConnection(socket, app, redisClient);

// starting http server
server.listen(process.env.PORT || 8000, () => {
    console.log("server started.")
})