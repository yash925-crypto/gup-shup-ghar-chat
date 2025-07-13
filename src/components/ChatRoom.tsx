
import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile, Crown, Users, Volume2, VolumeX, LogOut, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: number;
  type: 'message' | 'system';
}

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface ChatRoomProps {
  roomName: string;
  roomId: string;
  username: string;
  isAdmin: boolean;
  users: User[];
  onLeaveRoom: () => void;
}

type Theme = 'dark' | 'white' | 'colorful';

const ChatRoom = ({ roomName, roomId, username, isAdmin, users, onLeaveRoom }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [theme, setTheme] = useState<Theme>('colorful');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = ['😀', '😂', '😍', '🤔', '😎', '🥳', '😭', '🔥', '💯', '👍', '❤️', '💀'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Add welcome message when component mounts
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      username: 'System',
      content: `${username} joined the room! 🎉`,
      timestamp: Date.now(),
      type: 'system'
    };
    setMessages([welcomeMessage]);
  }, [username]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        username,
        content: newMessage.trim(),
        timestamp: Date.now(),
        type: 'message'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate sound effect
      if (soundEnabled) {
        console.log('🔊 Dhinchak sound played!');
      }
    }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleLeaveRoom = () => {
    if (isAdmin) {
      const confirmLeave = window.confirm(
        "⚠️ Admin Alert!\nIf you leave, the entire room will be deleted immediately!\nAre you sure?"
      );
      if (confirmLeave) {
        onLeaveRoom();
      }
    } else {
      onLeaveRoom();
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return {
          container: 'min-h-screen bg-gray-900 flex flex-col',
          header: 'bg-gray-800 border-b border-gray-700 p-4',
          headerText: 'text-white',
          messages: 'flex-1 overflow-y-auto p-4 space-y-2 bg-gray-900',
          input: 'bg-gray-800 border-t border-gray-700 p-4',
          inputField: 'flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400',
          welcomeText: 'text-center text-gray-300 mt-8'
        };
      case 'white':
        return {
          container: 'min-h-screen bg-white flex flex-col',
          header: 'bg-gray-100 border-b border-gray-200 p-4',
          headerText: 'text-gray-800',
          messages: 'flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50',
          input: 'bg-white border-t border-gray-200 p-4',
          inputField: 'flex-1 bg-white border-gray-300 text-gray-800 placeholder-gray-500',
          welcomeText: 'text-center text-gray-600 mt-8'
        };
      default: // colorful
        return {
          container: 'min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex flex-col',
          header: 'bg-white/10 backdrop-blur-md border-b border-white/20 p-4',
          headerText: 'text-white',
          messages: 'flex-1 overflow-y-auto p-4 space-y-2',
          input: 'bg-white/10 backdrop-blur-md border-t border-white/20 p-4',
          inputField: 'flex-1 bg-white/20 border-white/30 text-white placeholder-white/50',
          welcomeText: 'text-center text-white/70 mt-8'
        };
    }
  };

  const getMessageBubbleStyle = (msg: Message) => {
    const isOwn = msg.username === username;
    const baseStyle = "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl mb-2 animate-scale-in";
    
    if (msg.type === 'system') {
      if (theme === 'dark') {
        return `${baseStyle} bg-gray-700 text-gray-300 mx-auto text-center text-sm`;
      } else if (theme === 'white') {
        return `${baseStyle} bg-gray-200 text-gray-600 mx-auto text-center text-sm`;
      } else {
        return `${baseStyle} bg-gray-200 text-gray-600 mx-auto text-center text-sm`;
      }
    }

    if (isOwn) {
      return `${baseStyle} bg-gradient-to-r from-pink-500 to-red-500 text-white ml-auto`;
    } else {
      if (theme === 'dark') {
        return `${baseStyle} bg-gray-700 text-white mr-auto shadow-md`;
      } else if (theme === 'white') {
        return `${baseStyle} bg-white text-gray-800 mr-auto shadow-md border border-gray-200`;
      } else {
        return `${baseStyle} bg-white text-gray-800 mr-auto shadow-md`;
      }
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={themeClasses.container}>
      {/* Header */}
      <div className={themeClasses.header}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {isAdmin && <Crown className="h-5 w-5 text-yellow-400" />}
              <div>
                <h1 className={`text-xl font-bold ${themeClasses.headerText}`}>{roomName}</h1>
                <p className={`${themeClasses.headerText} opacity-60 text-xs`}>ID: {roomId}</p>
              </div>
            </div>
            <div className="relative">
              <Button
                onClick={() => setShowUsersList(!showUsersList)}
                className={theme === 'colorful' ? "bg-white/20 hover:bg-white/30 text-white p-2 flex items-center space-x-1" : "bg-gray-600 hover:bg-gray-700 text-white p-2 flex items-center space-x-1"}
              >
                <Users className="h-4 w-4" />
                <span>{users.length}</span>
              </Button>
              
              {showUsersList && (
                <Card className="absolute top-12 left-0 p-3 bg-white shadow-lg z-10 min-w-48">
                  <h3 className="font-semibold mb-2">Online Users</h3>
                  <div className="space-y-1">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center space-x-2 text-sm">
                        {user.isAdmin && <Crown className="h-3 w-3 text-yellow-500" />}
                        <span className={user.username === username ? 'font-bold text-blue-600' : ''}>
                          {user.username}
                        </span>
                        {user.isAdmin && <span className="text-xs text-gray-500">(Admin)</span>}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className={theme === 'colorful' ? "bg-white/20 hover:bg-white/30 text-white p-2" : "bg-gray-600 hover:bg-gray-700 text-white p-2"}
              >
                <Palette className="h-4 w-4" />
              </Button>
              
              {showThemeSelector && (
                <Card className="absolute top-12 right-0 p-3 bg-white shadow-lg z-10 min-w-32">
                  <h3 className="font-semibold mb-2 text-sm">Theme</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => {setTheme('colorful'); setShowThemeSelector(false);}}
                      className={`w-full text-left px-2 py-1 rounded text-xs hover:bg-gray-100 ${theme === 'colorful' ? 'bg-blue-100 text-blue-600' : ''}`}
                    >
                      🌈 Colorful
                    </button>
                    <button
                      onClick={() => {setTheme('dark'); setShowThemeSelector(false);}}
                      className={`w-full text-left px-2 py-1 rounded text-xs hover:bg-gray-100 ${theme === 'dark' ? 'bg-blue-100 text-blue-600' : ''}`}
                    >
                      🌙 Dark
                    </button>
                    <button
                      onClick={() => {setTheme('white'); setShowThemeSelector(false);}}
                      className={`w-full text-left px-2 py-1 rounded text-xs hover:bg-gray-100 ${theme === 'white' ? 'bg-blue-100 text-blue-600' : ''}`}
                    >
                      ☀️ White
                    </button>
                  </div>
                </Card>
              )}
            </div>
            <Button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={theme === 'colorful' ? "bg-white/20 hover:bg-white/30 text-white p-2" : "bg-gray-600 hover:bg-gray-700 text-white p-2"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleLeaveRoom}
              className={`px-4 text-white ${isAdmin ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
            >
              <LogOut className="h-4 w-4 mr-1" />
              {isAdmin ? 'Delete Room' : 'Leave'}
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={themeClasses.messages}>
        {messages.length <= 1 && (
          <div className={themeClasses.welcomeText}>
            <p className="text-lg">🎉 Welcome to {roomName}!</p>
            <p className="text-sm mt-2">Start the conversation... {isAdmin ? 'You are the admin!' : 'Have fun chatting!'}</p>
            {isAdmin && (
              <p className="text-xs mt-1 text-red-300">⚠️ If you leave, the room will be deleted immediately!</p>
            )}
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <div className={getMessageBubbleStyle(message)}>
              {message.type === 'message' && (
                <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                  <span className="flex items-center">
                    {users.find(u => u.username === message.username)?.isAdmin && (
                      <Crown className="h-3 w-3 text-yellow-300 mr-1" />
                    )}
                    {message.username}
                  </span>
                  <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
              )}
              <p className="break-words">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={themeClasses.input}>
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="relative">
            <Button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={theme === 'colorful' ? "bg-white/20 hover:bg-white/30 text-white p-2" : "bg-gray-600 hover:bg-gray-700 text-white p-2"}
            >
              <Smile className="h-4 w-4" />
            </Button>
            
            {showEmojiPicker && (
              <Card className="absolute bottom-12 left-0 p-2 bg-white shadow-lg z-10">
                <div className="grid grid-cols-6 gap-1">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="text-xl hover:bg-gray-100 p-1 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className={themeClasses.inputField}
            maxLength={500}
          />
          
          <Button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        <div className={`text-center ${themeClasses.headerText} opacity-50 text-xs mt-2`}>
          {soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"} • 
          {isAdmin ? " 👑 You are Admin" : ` 👤 ${users.length} users online`}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
