import React from "react";

const ChatWindow = ({ messages = [] , onDeleteMessage }) => {
  return (
    <div className="chat-window">
      {messages.map((message) => (
        <div
          key={message.id}
          className={message.sender === "Alex" ? "message-sent" : "message-received"}
        >
          <p>{message.text}</p>
          <button
            className="delete-button"
            onClick={() => onDeleteMessage(message.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
