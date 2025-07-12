
import React, { useEffect, useState } from 'react';

interface PrivacyWrapperProps {
  children: React.ReactNode;
}

const PrivacyWrapper = ({ children }: PrivacyWrapperProps) => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Handle tab visibility
    const handleVisibilityChange = () => {
      setIsBlurred(document.hidden);
    };

    // Handle window blur/focus
    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div className={`transition-all duration-300 ${isBlurred ? 'blur-md' : ''}`}>
      {children}
      {isBlurred && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-lg font-semibold mb-2">🕵️ Privacy Mode</p>
            <p className="text-gray-600">Click here to continue chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyWrapper;
