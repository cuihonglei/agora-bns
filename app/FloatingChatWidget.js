// FloatingChatWidget.js

import React, { useState } from 'react';

const FloatingChatWidget = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setClickCount(clickCount + 1);

    if (clickCount === 0) {
      setIsVisible(true);
    } else if (clickCount === 1) {
      setIsVisible(false);
    } 
  };

  const getButtonText = () => {
    switch (clickCount) {
      case 0:
        return 'Support';
      case 1:
        return 'Close Support';
      default:
        setIsVisible(true); // Show the button again
        setClickCount(0); // Reset click count
        return 'Support'; // Return default button text
    }
  };
  

  const loadBotpressWebchat = () => {
    // Load Botpress webchat scripts
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    injectScript.async = true;
    document.head.appendChild(injectScript);

    const configScript = document.createElement('script');
    configScript.src = 'https://mediafiles.botpress.cloud/eacbf454-69c0-4f33-8a92-f53059a128af/webchat/config.js';
    configScript.defer = true;
    document.head.appendChild(configScript);
  };

  return (
    <div className="fixed bottom-4 left-4">
      {isVisible && (
        <div className="chat-widget">
          {loadBotpressWebchat()}
        </div>
      )}
      <button className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg" onClick={toggleVisibility}>
        {getButtonText()}
      </button>
    </div>
  );
};

export default FloatingChatWidget;


