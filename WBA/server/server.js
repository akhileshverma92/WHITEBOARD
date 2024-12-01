const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialize Express app and create HTTP server
const app = express();
const server = http.createServer(app);

// Configure CORS to allow connections from your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
  methods: ['GET', 'POST']
}));

// Create Socket.IO server with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
    methods: ['GET', 'POST']
  }
});

// Store rooms and participants
const rooms = new Map();

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join room handler
  socket.on('join room', ({ username, roomId }) => {
    // Leave any previous rooms
    Array.from(socket.rooms)
      .filter(room => room !== socket.id)
      .forEach(room => socket.leave(room));

    // Join new room
    socket.join(roomId);

    // Create room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    // Add participant to room
    const roomParticipants = rooms.get(roomId);
    roomParticipants.add({
      id: socket.id,
      username
    });

    // Broadcast updated participant list to room
    io.to(roomId).emit('room participants', Array.from(roomParticipants));

    console.log(`${username} joined room ${roomId}`);
  });

  // Drawing synchronization
  socket.on('draw', (drawData) => {
    // Broadcast drawing data to all other clients in the same room
    socket.to(drawData.roomId).emit('draw', drawData);
  });

  // Chat message handler
  socket.on('chat message', (messageData) => {
    // Broadcast message to all clients in the room
    io.to(messageData.roomId).emit('chat message', messageData);
  });

  // Disconnect handler
  socket.on('disconnect', () => {
    // Remove participant from all rooms
    rooms.forEach((participants, roomId) => {
      const participant = Array.from(participants).find(p => p.id === socket.id);
      
      if (participant) {
        participants.delete(participant);
        
        // Broadcast updated participant list
        io.to(roomId).emit('room participants', Array.from(participants));
        
        console.log(`${participant.username} left room ${roomId}`);
      }
    });

    console.log('Client disconnected:', socket.id);
  });
});

// Optional: Simple health check route
app.get('/', (req, res) => {
  res.json({
    status: 'Whiteboard Socket Server Running',
    timestamp: new Date().toISOString()
  });
});

// Server configuration
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});