import { Server, Socket } from 'socket.io';
import { server } from './app';

const corsConfig = {
  origin: '*',
  // path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
};

const io = new Server(server, {
  cors: corsConfig,
});

io.on('connection', (socket: Socket) => {
  console.log('Client connected...', socket.id);
  socket.emit('messages', 'Hello from server', socket.id);
  socket.on('login', (data) => {
    // console.log(data);
    socket.emit('messages', 'Hello from server', data);
  });
});
export { io };
