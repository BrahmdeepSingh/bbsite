import { Server } from 'socket.io';

export function setupSocket(io: Server) {
  // Socket setup logic
  io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
} 