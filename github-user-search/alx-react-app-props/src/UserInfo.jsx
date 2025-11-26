import UserDetails from './UserDetails';

// Remove the userData prop from the function signature
function UserInfo() {
  return <UserDetails />; // Remove the userData prop passed down
}

export default UserInfo;