// react-router-advanced/src/App.jsx - FINAL CONTENT FOR TASK 2

import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import ProfileDetails from './pages/ProfileDetails';
import ProfileSettings from './pages/ProfileSettings';

// Helper component for navigation and logout
const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4 font-sans">
      <nav className="flex space-x-4 border-b pb-4 mb-6 items-center">
        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-indigo-700" : "text-gray-600"}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "font-bold text-indigo-700" : "text-gray-600"}>About</NavLink>
        {/* Dynamic Route Demonstration */}
        <NavLink to="/posts/42" className={({ isActive }) => isActive ? "font-bold text-indigo-700" : "text-gray-600"}>Dynamic Post (ID 42)</NavLink>
        {/* Protected Route Link */}
        <NavLink to="/profile" className={({ isActive }) => isActive ? "font-bold text-indigo-700" : "text-gray-600"}>Protected Profile</NavLink>
        
        {user ? (
          <button onClick={logout} className="ml-auto px-3 py-1 bg-red-500 text-white rounded">
            Logout ({user.username})
          </button>
        ) : (
          <NavLink to="/login" className="ml-auto px-3 py-1 bg-green-500 text-white rounded">Login</NavLink>
        )}
      </nav>
      
      {/* Renders the currently matched child route */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};


function App() {
  // Structure: BrowserRouter > AuthProvider > Routes > Route path="/" (Layout) > Child Routes
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          <Route path="/" element={<Layout />}>
            {/* Standard Routes */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />

            {/* Dynamic Route: Uses parameter :postId */}
            <Route path="posts/:postId" element={<PostDetail />} /> 

            {/* Protected Route: Wrapped by ProtectedRoute component */}
            <Route 
              path="profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            >
              {/* Nested Routes within Profile */}
              <Route index element={<ProfileDetails />} /> 
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            {/* Catch-all for 404 */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;