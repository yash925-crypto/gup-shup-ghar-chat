
import React, { useState } from 'react';
import { Heart, Users, Crown, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HomePageProps {
  onCreateRoom: (roomName: string, password: string) => void;
  onJoinRoom: (roomId: string, password: string, username: string) => void;
}

const HomePage = ({ onCreateRoom, onJoinRoom }: HomePageProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const funnyRoomNames = [
    "GupShup Ghar 🏠",
    "Bakchodi Central 🎭",
    "Masti Ka Adda ✨",
    "Dil Ki Baat ❤️",
    "Secret Society 🤫",
    "Timepass Junction 🚂"
  ];

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim() && password.trim()) {
      onCreateRoom(roomName, password);
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim() && password.trim() && username.trim()) {
      onJoinRoom(roomId, password, username);
    }
  };

  const suggestRoomName = () => {
    const randomName = funnyRoomNames[Math.floor(Math.random() * funnyRoomNames.length)];
    setRoomName(randomName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center text-white">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-200 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-2">GupShup Ghar</h1>
          <p className="text-lg opacity-90">"Yahan pyaar ho ya bakchodi, sab temporary hai!"</p>
          <div className="flex items-center justify-center mt-2 text-sm opacity-75">
            <Coffee className="h-4 w-4 mr-1" />
            <span>Messages auto-delete in 30 seconds</span>
          </div>
        </div>

        {!isCreating && !isJoining && (
          <div className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-white">Choose Your Adventure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setIsCreating(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Create Room 👑
                </Button>
                <Button
                  onClick={() => setIsJoining(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Room 🚪
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {isCreating && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-center">Create Your Room</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Room Name</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="Enter room name..."
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/50"
                    />
                    <Button
                      type="button"
                      onClick={suggestRoomName}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3"
                    >
                      ✨
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set a password..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    Create Room 🎉
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {isJoining && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-center">Join Room</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinRoom} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Room ID</label>
                  <Input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter room ID..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Your Name</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={() => setIsJoining(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600"
                  />
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    Join Chat 💬
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomePage;
