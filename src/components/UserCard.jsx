import React from 'react';

// NOTE: Since the /search/users API doesn't return 'location' or 'public_repos',
// this card will display placeholders or 'N/A' for those fields in a basic implementation.
// A production app would make a follow-up call to the /users/{username} endpoint.

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
      <img
        className="w-16 h-16 rounded-full object-cover"
        src={user.avatar_url}
        alt={`${user.login} avatar`}
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-indigo-600 truncate">
          {user.login}
        </h3>
        <p className="text-sm text-gray-500">
          ID: **{user.id}**
        </p>
        <p className="text-sm text-gray-500">
          Location: **N/A** (Requires extra API call)
        </p>
        <p className="text-sm text-gray-500">
          Repositories: **N/A** (Requires extra API call)
        </p>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full font-medium"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserCard;