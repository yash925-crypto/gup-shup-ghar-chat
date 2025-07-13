
import React, { useState } from 'react';
import HomePage from '@/components/HomePage';
import ChatRoom from '@/components/ChatRoom';
import PrivacyWrapper from '@/components/PrivacyWrapper';
import { toast } from "@/hooks/use-toast";

interface Room {
  id: string;
  name: string;
  password: string;
  admin: string;
  users: User[];
}

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleCreateRoom = (roomName: string, password: string, adminName: string) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const adminUser: User = {
      id: 'admin-' + Date.now(),
      username: adminName,
      isAdmin: true
    };
    
    const room: Room = {
      id: roomId,
      name: roomName,
      password,
      admin: adminUser.id,
      users: [adminUser]
    };

    setRooms(prev => [...prev, room]);
    setCurrentRoom(room);
    setUsername(adminName);
    setIsAdmin(true);

    toast({
      title: "Room Created! 🎉",
      description: `Room ID: ${roomId}`,
    });

    console.log(`🎊 Room created: ${roomName} (ID: ${roomId}) by ${adminName}`);
    console.log('📋 Current rooms:', [...rooms, room]);
  };

  const validateRoom = (roomId: string, password: string) => {
    console.log('🔍 Validating room - ID:', roomId, 'Password:', password);
    console.log('📋 Available rooms:', rooms);
    
    // Convert both to uppercase for comparison and trim spaces
    const searchId = roomId.trim().toUpperCase();
    const searchPassword = password.trim();
    
    const room = rooms.find(r => {
      const roomIdMatch = r.id.toUpperCase() === searchId;
      const passwordMatch = r.password === searchPassword;
      console.log('🔄 Checking room:', r.id, 'vs', searchId, '| Password match:', passwordMatch);
      return roomIdMatch && passwordMatch;
    });
    
    console.log('🎯 Validation result:', room ? 'Found' : 'Not found');
    return room || null;
  };

  const handleJoinRoom = (roomId: string, password: string, userUsername: string) => {
    console.log('🚪 Join attempt - Room:', roomId, 'Password:', password, 'Username:', userUsername);
    
    const room = validateRoom(roomId, password);
    
    if (!room) {
      console.log('❌ Room not found during join');
      toast({
        title: "Invalid Room! ❌",
        description: "Room ID or password is incorrect",
        variant: "destructive"
      });
      return false;
    }

    // Check if username already exists in room
    const usernameExists = room.users.some(user => 
      user.username.toLowerCase().trim() === userUsername.toLowerCase().trim()
    );
    if (usernameExists) {
      toast({
        title: "Username Taken! ❌",
        description: "This username is already in use in this room",
        variant: "destructive"
      });
      return false;
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      username: userUsername.trim(),
      isAdmin: false
    };

    const updatedRoom = {
      ...room,
      users: [...room.users, newUser]
    };

    setRooms(prev => prev.map(r => r.id === room.id ? updatedRoom : r));
    setCurrentRoom(updatedRoom);
    setUsername(userUsername.trim());
    setIsAdmin(false);

    toast({
      title: "Joined Room! 🚀",
      description: `Welcome to ${room.name}`,
    });

    console.log(`🎈 ${userUsername} joined room: ${roomId}`);
    return true;
  };

  const handleLeaveRoom = () => {
    if (currentRoom) {
      if (isAdmin) {
        // Admin leaves = Room deletes immediately
        setRooms(prev => prev.filter(r => r.id !== currentRoom.id));
        toast({
          title: "Room Deleted! 💥",
          description: "Admin left - Room has been deleted",
        });
        console.log('👑 Admin left - Room deleted immediately');
      } else {
        // Regular user leaves
        const updatedRoom = {
          ...currentRoom,
          users: currentRoom.users.filter(u => u.username !== username)
        };
        setRooms(prev => prev.map(r => r.id === currentRoom.id ? updatedRoom : r));
        
        toast({
          title: "Left Room 👋",
          description: "You have left the chat",
        });
        console.log('👋 User left the room');
      }
    }

    setCurrentRoom(null);
    setUsername('');
    setIsAdmin(false);
  };

  return (
    <PrivacyWrapper>
      <div className="w-full">
        {!currentRoom ? (
          <HomePage 
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
            onValidateRoom={validateRoom}
          />
        ) : (
          <ChatRoom
            roomName={currentRoom.name}
            roomId={currentRoom.id}
            username={username}
            isAdmin={isAdmin}
            users={currentRoom.users}
            onLeaveRoom={handleLeaveRoom}
          />
        )}
      </div>
    </PrivacyWrapper>
  );
};

export default Index;
