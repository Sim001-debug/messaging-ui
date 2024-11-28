import { useState } from "react"

const UserManagement = ({ onAddUser }) => {
    const [newUserName, setNewUserName] = useState("");

    const handleSend = () => {
        if (newUserName.trim()) {
            onAddUser(newUserName);
            setNewUserName("");
        }
    };

    return (
        <div className="user-management">
            <input 
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Enter user name"
            />
            <button onClick={handleSend}>Add User</button>
        </div>
    );
};

export default UserManagement;