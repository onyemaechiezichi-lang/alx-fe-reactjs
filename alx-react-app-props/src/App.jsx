import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';

function App() {
  const userData = { name: "Jane Doe (Context API)", email: "jane.doe@example.com" };

  // Wrap the ProfilePage component inside UserContext.Provider.
  // Pass userData as the value to the provider.
  return (
    <UserContext.Provider value={userData}>
      <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start font-sans">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Application Root (App.jsx)
          </h1>
          {/* userData prop removed */}
          <ProfilePage />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;