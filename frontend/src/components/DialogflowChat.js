// src/components/DialogflowChat.js
import React from "react";

const DialogflowChat = () => {
  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <iframe
        allow="microphone;"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/8459e7c1-47dd-4edf-aeef-4ecb5d657ec4"
      ></iframe>
    </div>
  );
};

export default DialogflowChat;
