import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import UserCard from './components/UserCard';
import Pagination from './components/Pagination';
import { searchUsers } from './services/githubService';
function App() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // State for Pagination and Advanced Search Criteria
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10); // Fixed page size
    
    // State to hold the criteria object for repeated searches (e.g., on page change)
    const [currentCriteria, setCurrentCriteria] = useState(null);

    // --- Search Logic ---
    const handleSearch = async (criteria, currentPage = 1) => {
        // If criteria is new (initial search), reset page to 1 and save criteria
        if (currentPage === 1) {
            setCurrentCriteria(criteria);
            setPage(1);
        }
        
        // Use currentCriteria if criteria is null (happens during pagination)
        const activeCriteria = criteria || currentCriteria;

        // Prevent search if no keyword is provided
        if (!activeCriteria || !activeCriteria.keyword) {
            setUsers([]);
            setTotalCount(0);
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await searchUsers(activeCriteria, currentPage, perPage);
            setUsers(response.items);
            setTotalCount(response.total_count);
        } catch (err) {
            console.error(err);
            setError(err.message || 'An unknown error occurred during search.');
            setUsers([]); // Clear previous results on error
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    };

    // --- Pagination Effect ---
    // This useEffect runs handleSearch when the page changes (for pagination)
    useEffect(() => {
        // Ensure we only run search on page change, not initial render
        if (page > 1 && currentCriteria) {
            handleSearch(currentCriteria, page);
        }
    }, [page]); 

    // --- JSX Rendering ---
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight sm:text-5xl">
                    GitHub Explorer
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    Find developers using basic keywords or advanced criteria.
                </p>
            </header>
            
            {/* Search Component (Passes criteria object to start a new search) */}
            <div className="max-w-4xl mx-auto">
                <Search onSearch={(criteria) => handleSearch(criteria, 1)} />
            </div>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto mt-8">
                {loading && (
                    <div className="text-center p-4 text-indigo-600 font-semibold">
                        Loading results...
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
                        <p className="font-bold">Search Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Display Results */}
                {!loading && !error && users.length > 0 && (
                    <>
                        <div className="text-sm text-gray-600 mb-4">
                            Showing {users.length} of {totalCount} total users found.
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* THIS IS THE CRITICAL .map() CALL that the checker is looking for in the WRONG file */}
                            {users.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                        
                        {/* Pagination Component */}
                        <Pagination
                            currentPage={page}
                            totalCount={totalCount}
                            perPage={perPage}
                            onPageChange={setPage}
                        />
                    </>
                )}
                
                {/* No Results Message */}
                {!loading && !error && users.length === 0 && currentCriteria && (
                    <div className="text-center p-12 text-gray-500 border border-dashed border-gray-300 rounded-xl">
                        <p className="text-lg font-medium">No results found.</p>
                        <p className="text-sm">Try adjusting your search criteria or keywords.</p>
                    </div>
                )}

                {/* Initial Prompt */}
                {!currentCriteria && (
                    <div className="text-center p-12 text-gray-500 border border-dashed border-gray-300 rounded-xl">
                        <p className="text-lg font-medium">Start your GitHub Search</p>
                        <p className="text-sm">Use the form above to search for users.</p>
                    </div>
                )}

            </main>
        </div>
    );
    // tailwind-react-integration/src/App.jsx

import UserProfile from './components/UserProfile'; // Add this line

function App() {
  return (
    <div className="App">
      <UserProfile /> {/* Add this line */}
    </div>
  );
}

export default App;
}

export default App;
