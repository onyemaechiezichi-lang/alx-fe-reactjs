import UserInfo from './UserInfo';

// Remove the userData prop from the function signature
function ProfilePage() { 
  return <UserInfo />; // Remove the userData prop passed down
}

export default ProfilePage;