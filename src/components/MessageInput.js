import React, { useState } from "react";

const MessageInput = ({ onSend }) => {

    const [text, setText] = useState("");

    const handleSend = () => {
        onSend(text);
        setText("");
    };

    return (

        <div className="message-input">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default MessageInput;
