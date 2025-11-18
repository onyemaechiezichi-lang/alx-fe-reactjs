import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  // State to hold the values for the advanced search form
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the collected advanced search criteria to the parent component/handler
    // We only include location/minRepos if they are actually entered.
    onSearch({
      username: username.trim(),
      location: location.trim(),
      minRepos: minRepos.trim() ? parseInt(minRepos.trim(), 10) : null,
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 shadow-lg rounded-xl mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🔍 GitHub Advanced User Search
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search Query (Username) */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username or Keywords
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., react developer"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            required // Basic search requires a query
          />
        </div>

        {/* Advanced Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., London"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>

          {/* Min Repositories Field */}
          <div>
            <label htmlFor="min-repos" className="block text-sm font-medium text-gray-700">
              Min. Public Repositories
            </label>
            <input
              type="number"
              id="min-repos"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g., 10"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search GitHub Users
        </button>
      </form>
    </div>
  );
};

export default Search;