import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import NewsFeed from "./components/NewsFeed"; 
import './App.css';
import UserManagement from "./components/UserManagement";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : { 1: [], 2: [] }; // Store messages as an object where keys are user ids
  });

  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("newsFeedPosts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  useEffect(() => {
    if (selectedUser && !messages[selectedUser.id]) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser.id]: [],
      }));
    }
  }, [selectedUser, messages]);

  // Save messages to localStorage whenever they update
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Save posts to localStorage whenever they update
  useEffect(() => {
    localStorage.setItem("newsFeedPosts", JSON.stringify(posts));
  }, [posts]);

  const handleSend = (text) => {
    if (!selectedUser || !text.trim()) return;

    const currentUser = selectedUser.id;
    const otherUser = currentUser === 1 ? 2 : 1;

    const newMessage = { id: Date.now(), sender: selectedUser.name, text };

    // Update messages for both users in the conversation
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      newMessages[currentUser] = [...newMessages[currentUser], newMessage];
      newMessages[otherUser] = [
        ...newMessages[otherUser],
        { id: Date.now() + 1, sender: selectedUser.name, text },
      ];
      return newMessages;
    });
  };

  const handleDeleteMessage = (messageId, userId) => {
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      updatedMessages[userId] = updatedMessages[userId].filter(
        (message) => message.id !== messageId
      );
      return updatedMessages;
    });
  };
  
  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleAddPost = (text) => {
    if (!text.trim()) return;

    const newPost = {
      id: Date.now(),
      text,
      author: selectedUser ? selectedUser.name : "Anonymous",
    };

    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const [users, setUsers] = useState([
    { id: 1, name: "Alex" },
    { id: 2, name: "Bob" },
  ]);

  const handleAddUser = (name) => {
    if(name.trim()) {
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: Date.now(), name: name.trim() }
      ]);
    }
  }

  return (
    <div className="app">
      <Sidebar users={users} onUserSelect={setSelectedUser} />
      <UserManagement onAddUser={handleAddUser}/>
      <div className="content">
        {selectedUser ? (
          <div className="chat-section">
            <ChatWindow messages={messages[selectedUser.id]}
              onDeleteMessage={(messageId) => handleDeleteMessage(messageId, selectedUser.id)}
            />
            <MessageInput onSend={handleSend} />
          </div>
        ) : (
          <p className="select-user-message">Select a user to start chatting!</p>
        )}
        <div className="news-feed-section">
          <NewsFeed posts={posts} onAddPost={handleAddPost} onDeletePost={handleDeletePost} />
        </div>
      </div>
    </div>
  );

};

export default App;
