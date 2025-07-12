
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
}

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCreateRoom = (roomName: string, password: string) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const room: Room = {
      id: roomId,
      name: roomName,
      password,
      admin: 'current-user' // In real app, this would be the user ID
    };

    setCurrentRoom(room);
    setUsername('Admin');
    setIsAdmin(true);

    toast({
      title: "Room Created! 🎉",
      description: `Room ID: ${roomId} - Share with friends!`,
    });

    console.log(`🎊 Room created: ${roomName} (ID: ${roomId})`);
  };

  const handleJoinRoom = (roomId: string, password: string, userUsername: string) => {
    // In a real app, this would validate against a server
    // For demo, we'll simulate a successful join
    const room: Room = {
      id: roomId,
      name: `Room ${roomId}`,
      password,
      admin: 'someone-else'
    };

    setCurrentRoom(room);
    setUsername(userUsername);
    setIsAdmin(false);

    toast({
      title: "Joined Room! 🚀",
      description: `Welcome to ${room.name}`,
    });

    console.log(`🎈 ${userUsername} joined room: ${roomId}`);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
    setUsername('');
    setIsAdmin(false);

    toast({
      title: "Left Room 👋",
      description: "All your messages have been deleted",
    });

    console.log('👋 Left the room');
  };

  return (
    <PrivacyWrapper>
      <div className="w-full">
        {!currentRoom ? (
          <HomePage 
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
          />
        ) : (
          <ChatRoom
            roomName={currentRoom.name}
            username={username}
            isAdmin={isAdmin}
            onLeaveRoom={handleLeaveRoom}
          />
        )}
      </div>
    </PrivacyWrapper>
  );
};

export default Index;
