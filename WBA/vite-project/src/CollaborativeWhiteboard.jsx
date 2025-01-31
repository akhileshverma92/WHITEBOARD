import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Paintbrush, Eraser, Trash2, Download, Copy, 
  MessageCircle, Users, Pencil, Square, Circle, 
  Type, Menu, Home, Settings 
} from 'lucide-react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const CollaborativeWhiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const socketRef = useRef(null);
  
  // Drawing States
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState('pencil');
  
  // Canvas History for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Chat and Connection States
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState([]);

  // UI States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);

  // Configuration Constants
  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#FFA500', '#800080', 
    '#008080', '#A52A2A'
  ];
  const shapeTypes = [
    { icon: Pencil, name: 'pencil' },
    {icon : Eraser, name: 'eraser'}
  ];

  // Initialize Canvas and Socket
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - (isToolbarOpen ? 320 : 80);
    canvas.height = window.innerHeight - 100;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    contextRef.current = context;

    // Initialize socket connection
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    // Enhanced drawing synchronization
    socketRef.current.on('draw', (drawData) => {
      if (!contextRef.current) return;

      const ctx = contextRef.current;
      ctx.strokeStyle = drawData.color;
      ctx.lineWidth = drawData.lineWidth;

      switch (drawData.tool) {
        case 'pencil':
          ctx.beginPath();
          ctx.moveTo(drawData.startX, drawData.startY);
          ctx.lineTo(drawData.endX, drawData.endY);
          ctx.stroke();
          break;
        case 'rectangle':
          ctx.strokeRect(
            Math.min(drawData.startX, drawData.endX), 
            Math.min(drawData.startY, drawData.endY), 
            Math.abs(drawData.endX - drawData.startX), 
            Math.abs(drawData.endY - drawData.startY)
          );
          break;
        case 'circle':
          const centerX = (drawData.startX + drawData.endX) / 2;
          const centerY = (drawData.startY + drawData.endY) / 2;
          const radius = Math.sqrt(
            Math.pow(drawData.endX - drawData.startX, 2) + 
            Math.pow(drawData.endY - drawData.startY, 2)
          ) / 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;
      }
    });

    // Chat and room listeners
    socketRef.current.on('chat message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socketRef.current.on('room participants', (participants) => {
      setParticipants(participants);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [isToolbarOpen]);

  // Improved Drawing Methods
  const startDrawing = (e) => {
    if (!isConnected) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x, y);

    setIsDrawing(true);

    // Capture current canvas state for history
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex(prev => prev + 1);
  };

  const draw = (e) => {
    if (!isDrawing || !isConnected) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create drawing data for synchronization
    const drawData = {
      roomId,
      startX: context.lastX || x,
      startY: context.lastY || y,
      endX: x,
      endY: y,
      color,
      lineWidth,
      tool
    };

    // Emit drawing data to other clients
    socketRef.current.emit('draw', drawData);

    // Local drawing
    context.lineTo(x, y);
    context.stroke();

    // Store last coordinates
    context.lastX = x;
    context.lastY = y;
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;

    const context = contextRef.current;
    context.closePath();
    setIsDrawing(false);
    
    // Reset last coordinates
    context.lastX = undefined;
    context.lastY = undefined;
  };

  // Clear Canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Emit clear event to all clients
    socketRef.current.emit('clear canvas', roomId);
  };

  // Navbar Component
  const Navbar = () => (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex justify-between items-center p-3">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsToolbarOpen(!isToolbarOpen)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Menu />
        </button>
        <h1 className="text-xl font-bold">Collaborative Whiteboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        {!isConnected ? (
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="p-2 border rounded"
            />
            <button 
              onClick={() => {
                if (username && roomId) {
                  socketRef.current.emit('join room', { username, roomId });
                  setIsConnected(true);
                }
              }}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              Join Room
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span>Room: {roomId}</span>
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <MessageCircle />
            </button>
            <div className="home">
        <Link to="/" className="text-balck font-semibold text-xl bg-blue-500 px-3 py-2 hover:text-white"> Home</Link>
      </div>
          </div>
        )}
      </div>

    </div>
  );

  return (
    
    <div className="relative w-full min-h-screen bg-gray-50">
    <Navbar />
  
    <div className="flex flex-col md:flex-row mt-16">
      {/* Toolbar */}
      {isToolbarOpen && (
        <div className="w-full md:w-64 bg-white shadow-md p-4 space-y-4 md:h-auto md:relative fixed bottom-0 md:bottom-auto md:flex-none">
          {/* Color Picker */}
          <div className="flex items-center space-x-2">
            <Paintbrush size={20} />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
  
          {/* Brush Size */}
          <div className="flex items-center space-x-2">
            <Eraser size={20} />
            <input
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-full"
            />
            <span>{lineWidth}</span>
          </div>
  
          {/* Tools */}
          <div className="flex space-x-2">
            {shapeTypes.map(({ icon: Icon, name }) => (
              <button
                key={name}
                onClick={() => setTool(name)}
                className={`p-2 rounded ${
                  tool === name
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon />
              </button>
            ))}
            <button
              onClick={clearCanvas}
              className="p-2 rounded hover:bg-red-100 text-red-600"
            >
              <Trash2 />
            </button>
          </div>
  
          {/* Color Palette */}
          <div className="flex flex-wrap gap-2">
            {colors.map((colorOption) => (
              <button
                key={colorOption}
                onClick={() => setColor(colorOption)}
                className="w-6 h-6 rounded-full hover:scale-110 transition-transform"
                style={{ backgroundColor: colorOption }}
              />
            ))}
          </div>
        </div>
      )}
  
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="bg-white flex-grow shadow-lg border-collapse border rounded-md mx-auto w-full md:ml-0 md:flex-1"
      />
  
      {/* Chat Sidebar */}
      {isChatOpen && isConnected && (
        <div className="w-full md:w-80 bg-white shadow-md p-4 flex flex-col md:h-auto md:relative fixed bottom-0 md:bottom-auto md:flex-none">
          <div className="mb-4">
            <h3 className="font-bold flex items-center">
              <Users className="mr-2" /> Participants
            </h3>
            {participants.map((participant) => (
              <div key={participant.id} className="p-2 border-b">
                {participant.username}
              </div>
            ))}
          </div>
  
          <div className="flex-grow overflow-y-auto mb-4 border rounded">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 ${
                  msg.username === username
                    ? 'text-right bg-blue-50'
                    : 'text-left bg-gray-50'
                }`}
              >
                <strong>{msg.username}</strong>
                <div>{msg.message}</div>
                <small className="text-gray-500">{msg.timestamp}</small>
              </div>
            ))}
          </div>
  
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (currentMessage.trim() && socketRef.current) {
                const messageData = {
                  roomId,
                  username,
                  message: currentMessage,
                  timestamp: new Date().toLocaleTimeString(),
                };
                socketRef.current.emit('chat message', messageData);
                setCurrentMessage('');
              }
            }}
            className="flex"
          >
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-l"
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-r"
            >
              <MessageCircle />
            </button>
          </form>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default CollaborativeWhiteboard;