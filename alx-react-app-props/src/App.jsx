import React from 'react';
import UserContext from './UserContext';
import ProfilePage from './ProfilePage';

// Mock user data that will be passed via Context
const mockUser = {
  id: 1,
  firstName: 'Zizzy',
  lastName: 'Software',
  email: 'zizzy.software@alx.com',
  jobTitle: 'Frontend Developer',
  company: 'ALX',
  bio: 'Learning React and state management. Context API eliminates prop drilling!'
};

function App() {
  return (
    // The Provider makes 'mockUser' available to all children components
    <UserContext.Provider value={mockUser}>
      <div className="App">
        <h1>Task 2: Context API Refactoring</h1>
        <ProfilePage />
      </div>
    </UserContext.Provider>
  );
}

export default App;