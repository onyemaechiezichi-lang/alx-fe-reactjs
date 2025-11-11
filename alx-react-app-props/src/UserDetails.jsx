import React, { useContext } from 'react';
import UserContext from './UserContext';

function UserDetails() {
  // Use useContext hook to get the user object directly from the Context
  const user = useContext(UserContext);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
      <h4>User Details (Data consumed via Context)</h4>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Title:</strong> {user.jobTitle} at {user.company}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
}

export default UserDetails;