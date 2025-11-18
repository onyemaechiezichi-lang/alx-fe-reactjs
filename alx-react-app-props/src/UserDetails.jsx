import React, { useContext } from 'react';
import UserContext from './UserContext'; 

// Removed the 'userData' prop from the signature
function UserDetails() {
  // Use the useContext hook to pull the userData directly from the context
  const userData = useContext(UserContext); 
  
  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;