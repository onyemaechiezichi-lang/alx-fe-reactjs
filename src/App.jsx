import React, { useState, useCallback } from 'react';
// Ensure these paths are correct for your project structure
import Search from './components/Search';
import UserCard from './components/UserCard';
import { searchUsers } from './services/githubService';
import { Link } from 'react-router-dom'; // Requires npm install react-router-dom
import './index.css'; 

// --- Navbar Component (Integrated from merge) ---
function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md flex justify-center">
      <Link to="/" className="text-white text-lg font-medium mx-4 hover:text-indigo-400 transition-colors">Home</Link>
      <Link to="/about" className="text-white text-lg font-medium mx-4 hover:text-indigo-400 transition-colors">About</Link>
      <Link to="/services" className="text-white text-lg font-medium mx-4 hover:text-indigo-400 transition-colors">Services</Link>
      <Link to="/contact" className="text-white text-lg font-medium mx-4 hover:text-indigo-400 transition-colors">Contact</Link>
    </nav>
  );
}
// --- End Navbar Component ---


// --- Main App Component (Advanced Search Logic) ---
function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentCriteria, setCurrentCriteria] = useState(null);
  const perPage = 10;

  // Function to handle the search (either initial or pagination)
  const handleSearch = useCallback(async (criteria = currentCriteria, page = 1, append = false) => {
    if (!criteria || (!criteria.username && !criteria.location && !criteria.minRepos)) return;

    setLoading(true);
    setError(null);
    setCurrentCriteria(criteria);

    try {
      const data = await searchUsers(criteria, page, perPage);

      setTotalCount(data.total_count);
      setCurrentPage(page);

      if (append) {
        setResults(prevResults => [...prevResults, ...data.items]);
      } else {
        setResults(data.items);
      }
    } catch (err) {
      setError(err.message || 'An unknown error occurred during the search.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [currentCriteria]);

  // Handler for the Search component's submission
  const handleInitialSearch = (criteria) => {
    // Reset to page 1 for a new search
    handleSearch(criteria, 1, false);
  };

  // Handler for "Load More" button
  const handleLoadMore = () => {
    // Load the next page, appending results
    handleSearch(currentCriteria, currentPage + 1, true);
  };

  const hasMore = results.length < totalCount;

  return (
    <>
      <Navbar /> {/* Integrated Navbar */}
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6 mt-4">
          GitHub User Search
        </h1>

        <Search onSearch={handleInitialSearch} />

        {/* Results Display Area */}
        {loading && <p className="text-center text-indigo-600 font-medium py-4">Loading users...</p>}
        {error && <p className="text-center text-red-600 font-medium py-4">Error: {error}</p>}
        
        {!loading && results.length > 0 && (
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700">
              Found **{totalCount.toLocaleString()}** matching users (showing {results.length})
            </p>
            <div className="mt-4 space-y-4">
              {results.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        )}
        
        {!loading && results.length === 0 && currentCriteria && (
            <p className="text-center text-gray-500 py-6 border-t">
                No users found matching the criteria. Try a different search!
            </p>
        )}

        {/* Pagination / Load More */}
        {!loading && hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              Load More Users
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;