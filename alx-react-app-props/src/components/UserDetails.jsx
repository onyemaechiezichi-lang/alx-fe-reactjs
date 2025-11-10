import React, { useContext } from 'react';
import UserContext from './UserContext';

// userData prop removed
function UserDetails() {
  // Consume context using the useContext hook
  const userData = useContext(UserContext);

  if (!userData) {
    return <p className="text-red-500 font-medium">Loading user data...</p>;
  }

  return (
    <div className="p-4 border border-blue-400 rounded-lg bg-blue-100">
      <h5 className="font-bold text-blue-800 mb-2">
        User Details (UserDetails.jsx)
      </h5>
      <p className="text-gray-700">
        <span className="font-semibold">Name:</span> {userData.name}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Email:</span> {userData.email}
      </p>
    </div>
  );
}

export default UserDetails;