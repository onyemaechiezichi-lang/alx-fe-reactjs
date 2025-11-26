// src/components/Search.jsx
import React, { useState } from 'react';

function Search({ onSearch }) {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const reposValue = minRepos === '' ? null : parseInt(minRepos, 10);

        // Package all parameters into a single criteria object
        const criteria = {
            keyword: keyword.trim(),
            location: location.trim(),
            minRepos: reposValue
        };
        onSearch(criteria);
    };

    return (
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
                    <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                        Username or Keywords (e.g., react, john)
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search GitHub users..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location (Optional)
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., New York, London"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>
                <div>
                    <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
                        Min. Repositories (Optional)
                    </label>
                    <input
                        type="number"
                        id="minRepos"
                        value={minRepos}
                        onChange={(e) => setMinRepos(e.target.value)}
                        placeholder="e.g., 10, 50"
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 transform hover:scale-[1.01]"
                >
                    Search GitHub
                </button>
            </div>
        </form>
    );
}

export default Search;