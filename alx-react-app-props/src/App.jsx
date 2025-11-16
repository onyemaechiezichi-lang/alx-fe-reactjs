import ProfilePage from './ProfilePage';
import UserContext from './UserContext'; // <-- NEW: Import the Context

function App() {
  // Data we want to share globally
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    // Wrap the components that need access in UserContext.Provider
    <UserContext.Provider value={userData}>
      {/* Remove userData prop passing here */}
      <ProfilePage /> 
    </UserContext.Provider>
  );
}

export default App;