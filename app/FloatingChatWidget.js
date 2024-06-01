import React from 'react';
//  this code is no longer need , I have implemented this code in the main header function.
const FloatingChatWidget = () => {

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
      <div className="chat-widget">
        {loadBotpressWebchat()}
      </div>
    </div>
  );
};

export default FloatingChatWidget;



