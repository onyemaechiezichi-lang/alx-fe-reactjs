import React from 'react';
import UserDetails from './UserDetails';

function UserInfo() {
  // NO PROPS PASSED HERE! UserDetails will consume the context directly.
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '15px' }}>
      <h3>User Information Block</h3>
      <UserDetails />
    </div>
  );
}

export default UserInfo;