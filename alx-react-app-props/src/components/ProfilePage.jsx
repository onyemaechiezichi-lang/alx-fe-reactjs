import React from 'react';
import UserInfo from './UserInfo';

// Remove the unused 'userData' prop from the function signature.
function ProfilePage() {
  return (
    <div className="p-4 border-2 border-indigo-200 rounded-lg my-4 bg-indigo-50">
      <h2 className="text-xl font-semibold mb-3 text-indigo-800">Profile Page (ProfilePage.jsx)</h2>
      {/* Remove the 'userData' prop passed to UserInfo */}
      <UserInfo />
    </div>
  );
}
export default ProfilePage;