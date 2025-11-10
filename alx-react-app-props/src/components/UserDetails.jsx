import React, { useContext } from 'react';
import UserContext from './UserContext';

// Remove the 'userData' prop from the function signature.
function UserDetails() {
  // Consume UserContext using the useContext hook to get data directly.
  const userData = useContext(UserContext);

  if (!userData) {
    return <p className="text-red-500">Loading user data or context not provided...</p>;
  }

  return (
    <div className="p-4 border border-blue-400 rounded-lg bg-blue-50">
      <h4 className="font-bold text-blue-700 mb-2">User Details (UserDetails.jsx)</h4>
      <p>Name: <span className="font-semibold text-gray-800">{userData.name}</span></p>
      <p>Email: <span className="font-semibold text-gray-800">{userData.email}</span></p>
    </div>
  );
}
export default UserDetails;