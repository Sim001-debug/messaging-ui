import React, { useState } from "react";

const NewsFeed = ({ posts, onAddPost, onDeletePost }) => {
  const [newPostText, setNewPostText] = useState("");

  const handleAddPost = () => {
    if (newPostText.trim()) {
      onAddPost(newPostText);
      setNewPostText("");
    }
  };

  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      <div className="new-post">
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Write a new post..."
        />
        <button onClick={handleAddPost}>Post</button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <p>
              <strong>{post.user}:</strong> {post.text}
            </p>
            <button onClick={() => onDeletePost(post.id)} className="delete-button">
                Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
