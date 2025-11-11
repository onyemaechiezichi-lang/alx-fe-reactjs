import React from 'react';
import UserInfo from './UserInfo';

function ProfilePage() {
  // IMPORTANT: No 'user' prop is passed down.
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>Profile Page (Context Consumer Area)</h2>
      <UserInfo />
    </div>
  );
}

export default ProfilePage;
