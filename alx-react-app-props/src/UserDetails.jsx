import React, { useContext } from 'react';
import UserContext from './UserContext'; // <-- NEW: Import the Context

// Remove the userData prop from the function signature
function UserDetails() {
  // Use the useContext hook to pull the userData directly from the context
  const userData = useContext(UserContext); 
  
  return (
    <div>
      <h2>User Details (Context API)</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;