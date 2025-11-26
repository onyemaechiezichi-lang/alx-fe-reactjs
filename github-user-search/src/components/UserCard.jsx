import React from 'react';
import { Mail, MapPin, GitBranch, Users } from 'lucide-react'; // Using lucide icons

// Component to display a single detailed user profile
const UserCard = ({ user }) => {
  // Ensure the user object has detailed data (location, repos, etc.)
  // which is provided by the merged searchUsers function.

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-5 flex items-start space-x-4">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="w-16 h-16 rounded-full border-2 border-indigo-400 flex-shrink-0"
      />
      
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {user.login}
          </h3>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex-shrink-0"
          >
            View Profile &rarr;
          </a>
        </div>
        
        {user.name && (
          <p className="text-sm text-gray-500 mb-2">{user.name}</p>
        )}

        <div className="space-y-1 text-sm text-gray-600">
          {/* Location */}
          {user.location && (
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-red-400" />
              <span className="truncate">{user.location}</span>
            </div>
          )}
          
          {/* Repositories Count */}
          <div className="flex items-center space-x-2">
            <GitBranch size={16} className="text-green-500" />
            <span>
              {user.public_repos !== undefined ? `${user.public_repos.toLocaleString()} Public Repos` : 'N/A Repos'}
            </span>
          </div>

          {/* Followers Count */}
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-blue-500" />
            <span>
              {user.followers !== undefined ? `${user.followers.toLocaleString()} Followers` : 'N/A Followers'}
            </span>
          </div>
          
          {/* Email */}
          {user.email && (
            <div className="flex items-center space-x-2 truncate">
              <Mail size={16} className="text-gray-500" />
              <span className="truncate">{user.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;