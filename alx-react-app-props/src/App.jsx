import { useState } from "react";
import UserContext from "./UserContext";
import UserProfile from "./components/UserProfile";

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    age: 30,
    location: "New York"
  });

  return (
    <UserContext.Provider value={user}>
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;
