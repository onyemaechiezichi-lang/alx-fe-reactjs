// react-router-advanced/src/pages/Profile.jsx

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 border-2 border-indigo-500">
      <h1 className="text-2xl mb-4">User Profile Dashboard</h1>
      <p>Welcome, <strong>{user.username}</strong>! This page is protected.</p>
      
      {/* Nested Navigation Links */}
      <nav className="flex space-x-4 mt-4 mb-4 border-b pb-2">
        <NavLink to="details" className={({ isActive }) => isActive ? "font-bold text-indigo-700" : "text-gray-600"}>
          Details
        </NavLink>
        <NavLink to="settings" className={({ isActive }) => isActive ? "font-bold text-indigo-700" : "text-gray-600"}>
          Settings
        </NavLink>
      </nav>
      
      {/* The Outlet renders the nested child route content (Details or Settings) */}
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Profile;