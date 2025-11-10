import React from "react";
import { UserContext } from "./UserContext";
import UserProfile from "./components/UserProfile";

function App() {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    location: "New York",
  };

  return (
    <UserContext.Provider value={user}>
      <div>
        <h1>Welcome to the User Profile App</h1>
        <UserProfile />
      </div>
    </UserContext.Provider>
  );
}

export default App;
