
import React, { useState } from 'react';
import { Heart, Users, Crown, Coffee, CheckCircle, Sparkles, Zap, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Room {
  id: string;
  name: string;
  password: string;
  admin: string;
  users: any[];
}

interface HomePageProps {
  onCreateRoom: (roomName: string, password: string, adminName: string) => void;
  onJoinRoom: (roomId: string, password: string, username: string) => boolean;
  onValidateRoom: (roomId: string, password: string) => Room | null;
}

const HomePage = ({ onCreateRoom, onJoinRoom, onValidateRoom }: HomePageProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [adminName, setAdminName] = useState('');
  const [validatedRoom, setValidatedRoom] = useState<Room | null>(null);
  const [validationError, setValidationError] = useState('');

  const funnyRoomNames = [
    "Dil Ki Baat ❤️",
    "Masti Ka Adda ✨", 
    "Secret Society 🤫",
    "Timepass Junction 🚂",
    "Friends Forever 🌟",
    "Chat Ka Raja 👑"
  ];

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim() && password.trim() && adminName.trim()) {
      onCreateRoom(roomName, password, adminName);
    }
  };

  const handleValidateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!roomId.trim() || !password.trim()) {
      setValidationError('Please fill in both Room ID and Password');
      return;
    }

    console.log('🔍 Validating room:', roomId.trim().toUpperCase(), 'with password:', password.trim());
    const room = onValidateRoom(roomId.trim().toUpperCase(), password.trim());
    
    if (room) {
      setValidatedRoom(room);
      setIsValidated(true);
      setValidationError('');
      console.log('✅ Room validated successfully:', room);
    } else {
      setValidationError('Invalid Room ID or Password. Please check and try again.');
      console.log('❌ Room validation failed for ID:', roomId.trim().toUpperCase(), 'Password:', password.trim());
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && validatedRoom) {
      console.log('🚪 Attempting to join room:', validatedRoom.id, 'with username:', username.trim());
      const success = onJoinRoom(validatedRoom.id, validatedRoom.password, username.trim());
      if (!success) {
        setIsValidated(false);
        setValidatedRoom(null);
        setValidationError('Failed to join room. Please try again.');
        console.log('❌ Failed to join room');
      } else {
        console.log('✅ Successfully joined room');
      }
    }
  };

  const suggestRoomName = () => {
    const randomName = funnyRoomNames[Math.floor(Math.random() * funnyRoomNames.length)];
    setRoomName(randomName);
  };

  const resetJoinFlow = () => {
    setIsJoining(false);
    setIsValidated(false);
    setRoomId('');
    setPassword('');
    setUsername('');
    setValidatedRoom(null);
    setValidationError('');
  };

  const resetCreateFlow = () => {
    setIsCreating(false);
    setRoomName('');
    setPassword('');
    setAdminName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center text-white animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="h-12 w-12 text-pink-200 animate-pulse" />
              <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 animate-scale-in bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            GupShup Ghar
          </h1>
          <p className="text-lg opacity-90 animate-fade-in delay-200">
            "Where conversations bloom and memories fade beautifully! ✨"
          </p>
          <div className="flex items-center justify-center mt-3 text-sm opacity-75 animate-fade-in delay-300">
            <Coffee className="h-4 w-4 mr-1 animate-spin" />
            <span>Admin leaves = Room vanishes instantly! ⚡</span>
          </div>
        </div>

        {/* Main Menu */}
        {!isCreating && !isJoining && (
          <div className="space-y-4 animate-scale-in delay-100">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-white flex items-center justify-center">
                  <Stars className="mr-2 h-5 w-5 animate-pulse" />
                  Choose Your Adventure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setIsCreating(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl animate-pulse"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Create Room 👑
                </Button>
                <Button
                  onClick={() => setIsJoining(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Room 🚪
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create Room Flow */}
        {isCreating && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center">
                <Crown className="mr-2 h-5 w-5 text-yellow-400" />
                Create Your Kingdom
              </CardTitle>
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
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 transition-all"
                      required
                    />
                    <Button
                      type="button"
                      onClick={suggestRoomName}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 transform hover:scale-110 transition-all animate-bounce"
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
                    placeholder="Set a strong password..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Your Name (Admin)</label>
                  <Input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Enter your name..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 transition-all"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={resetCreateFlow}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 transition-all transform hover:scale-105"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Create Room 🎉
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Join Room - Step 1: Validate Credentials */}
        {isJoining && !isValidated && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-center">Enter Room Details</CardTitle>
              <p className="text-white/70 text-center text-sm">First, let's verify the room exists!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleValidateRoom} className="space-y-4">
                {validationError && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm animate-bounce">
                    ❌ {validationError}
                  </div>
                )}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Room ID</label>
                  <Input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    placeholder="Enter 6-digit room ID..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 transition-all font-mono text-center text-lg"
                    maxLength={6}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter room password..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 transition-all"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={resetJoinFlow}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 transition-all transform hover:scale-105"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Validate 🔍
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Join Room - Step 2: Enter Username */}
        {isJoining && isValidated && validatedRoom && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-400 animate-pulse" />
                Room Found! 🎉
              </CardTitle>
              <div className="text-center animate-bounce">
                <p className="text-green-200 text-sm font-medium">✅ Room: {validatedRoom.name}</p>
                <p className="text-white/70 text-sm">👥 {validatedRoom.users.length} user(s) online</p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinRoom} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Choose Your Username</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter a cool username..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 transition-all"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={() => setIsValidated(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 transition-all transform hover:scale-105"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all animate-pulse"
                  >
                    <Users className="mr-2 h-4 w-4" />
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
