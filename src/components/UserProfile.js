import React, { useState } from 'react';

const UserProfile = ({ user, onUpdateProfile }) => {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = () => {
    onUpdateProfile({ ...user, bio });
    setEditing(false);
  };

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar" />
      <h2>{user.name}</h2>
      {editing ? (
        <div>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>{bio || "No bio available"}</p>
      )}
      <button onClick={() => setEditing(!editing)}>
        {editing ? 'Cancel' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default UserProfile;
