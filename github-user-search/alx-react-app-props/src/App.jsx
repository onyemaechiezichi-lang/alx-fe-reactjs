import ProfilePage from './ProfilePage';
import UserContext from './UserContext'; 

// Mock user data that will be passed via Context
const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

function App() {
  return (
    // Wrap the components that need access in UserContext.Provider
    <UserContext.Provider value={userData}>
      <div className="App">
        {/* ProfilePage is the top-level component that consumes or passes data */}
        <ProfilePage /> 
      </div>
    </UserContext.Provider>
  );
}

export default App;