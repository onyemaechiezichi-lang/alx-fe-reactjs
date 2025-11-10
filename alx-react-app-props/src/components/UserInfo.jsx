import React from 'react';
import UserDetails from './UserDetails';

// Remove the unused 'userData' prop from the function signature.
function UserInfo() {
  return (
    <div className="p-4 border border-green-400 rounded-lg my-4 bg-green-50">
      <h3 className="text-lg font-medium mb-3 text-green-700">User Info (UserInfo.jsx)</h3>
      {/* Remove the 'userData' prop passed to UserDetails */}
      <UserDetails />
    </div>
  );
}
export default UserInfo;