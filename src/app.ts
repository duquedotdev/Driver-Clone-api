import 'reflect-metadata';
import cors from 'cors';
import { createServer } from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';

import { routes } from './router';

import './database';

const corsConfig = {
  origin: '*',
  path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
};

const app = express();
const server = createServer(app);
app.use(cors(corsConfig));

app.use(express.json());

routes(app);

const io = new Server(server, {
  cors: corsConfig,
});

io.on('connection', (socket: Socket) => {
  console.log('Client connected...', socket.id);
  socket.on('login', (data) => {
    // console.log(data);
    socket.emit('messages', 'Hello from server', data);
  });
});

export { server, io };
