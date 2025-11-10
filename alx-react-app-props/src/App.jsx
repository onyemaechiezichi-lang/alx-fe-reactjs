import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';

function App() {
  const userData = { name: "Jane Doe (Context API)", email: "jane.doe@example.com" };

  // Wrap the ProfilePage component inside UserContext.Provider.
  // Pass userData as the value to the provider.
  return (
    <UserContext.Provider value={userData}>
      <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Application Root (App.jsx)</h1>
          {/* Removed userData prop passed to ProfilePage */}
          <ProfilePage />
        </div>
      </div>
    </UserContext.Provider>
  );
}
export default App;