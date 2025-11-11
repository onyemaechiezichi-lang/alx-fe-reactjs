import ProfilePage from './ProfilePage';
import { UserContext } from './UserContext'; // Import UserContext

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}> {/* Provide userData */}
      <ProfilePage /> {/* No need to pass userData as prop here */}
    </UserContext.Provider>
  );
}

export default App;