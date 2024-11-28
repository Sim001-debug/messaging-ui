import React from 'react';

const Sidebar = ({ users, onUserSelect }) => (

    <div className='sidebar'>
        
        {users.map((user) => (
            <div key={user.id} onClick={() => onUserSelect(user)}>
                {user.name}
            </div>
        ))}

    </div>
);

export default Sidebar;