<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import UserCard from './components/UserCard';
import Pagination from './components/Pagination';
import { searchUsers } from './services/githubService';
=======
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useRecipeStore from './store/recipeStore.js'; 

// Firebase Imports for Task 4
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setLogLevel } from 'firebase/firestore';

// Component Imports
import AddRecipeForm from './components/AddRecipeForm.jsx'; 
import RecipeList from './components/RecipeList.jsx';
import RecipeDetail from './components/RecipeDetail.jsx'; 
import SearchBar from './components/SearchBar.jsx'; 
import FavoritesList from './components/FavoritesList.jsx'; 
import RecommendationsList from './components/RecommendationsList.jsx'; 

// --- Global Variable Retrieval (MANDATORY) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Firestore Document Path (Data is stored in one document per user for simplicity)
const getRecipesDocRef = (db, uid) => doc(db, 'artifacts', appId, 'users', uid, 'data', 'recipes_data');


/**
 * Component that renders the home page content
 */
const HomePageContent = () => {
  // Local state for Firebase instances and auth readiness
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Store actions
  const setRecipesAndFavorites = useRecipeStore((state) => state.setRecipesAndFavorites);
  const setStoreDB = useRecipeStore((state) => state.setDB);
  const setStoreUserId = useRecipeStore((state) => state.setUserId);

  // --- Task 4, Step 1: Firebase Initialization and Authentication ---
  useEffect(() => {
    if (!firebaseConfig) {
      console.error("Firebase config is missing. Cloud persistence cannot be initialized.");
      return;
    }
    
    // Set Firestore log level for debugging
    setLogLevel('error');

    try {
      const app = initializeApp(firebaseConfig);
      const initializedDb = getFirestore(app);
      const initializedAuth = getAuth(app);

      setDb(initializedDb);

      // Sign-in logic
      const authenticate = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(initializedAuth, initialAuthToken);
          } else {
            await signInAnonymously(initializedAuth);
          }
        } catch (error) {
          console.error("Firebase authentication failed:", error);
          await signInAnonymously(initializedAuth);
        }
      };

      // Listener to handle auth state changes and set userId
      const unsubscribe = onAuthStateChanged(initializedAuth, (user) => {
        if (user) {
          const currentUid = user.uid;
          setUserId(currentUid);
          setStoreUserId(currentUid); // Set ID in Zustand store
          setStoreDB(initializedDb); // Set DB in Zustand store
        } else {
          setUserId(null);
          setStoreUserId(null);
        }
        setIsAuthReady(true);
      });

      authenticate();
      return () => unsubscribe(); // Cleanup auth listener on component unmount

    } catch (error) {
      console.error("Error during Firebase initialization:", error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once on mount

  // --- Task 4, Step 3: Firestore Read Listener (onSnapshot) ---
  useEffect(() => {
    // Crucial Guard: Do not run queries until Firebase is initialized AND Auth has set the userId
    if (!isAuthReady || !db || !userId) {
      return;
    }

    let unsubscribeRecipes = () => {};

    try {
      const recipesDocRef = getRecipesDocRef(db, userId);

      // Listener: Recipes Data
      unsubscribeRecipes = onSnapshot(recipesDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Use the data structure defined in the store's write action
          setRecipesAndFavorites(data.recipes || [], data.favorites || []);
        } else {
          // Document doesn't exist yet, which is expected for a new user.
          console.log("Recipes document does not exist, using initial state and waiting for first write.");
          // Since the store initializes state, we don't need to do anything here except wait for the user to add the first item.
        }
      }, (error) => {
        console.error("Error listening to recipes snapshot:", error);
      });
      
    } catch (error) {
      console.error("Error setting up Firestore listeners:", error);
    }

    // Cleanup: Stop listening when component unmounts or dependencies change
    return () => {
      if (unsubscribeRecipes) {
        unsubscribeRecipes();
      }
    };

  // The listener runs when Firebase instances or auth state changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthReady, db, userId]); 

  // Display Loading State until Auth and Firestore are ready
  if (!isAuthReady) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontSize: '1.2em', color: '#333' }}>
        Loading application and securing user session...
      </div>
    );
  }

  return (
    <div 
      className="App" 
      style={{ 
        maxWidth: '700px', 
        margin: '30px auto', 
        padding: '30px', 
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', fontSize: '2.5em', margin: '0 0 5px 0' }}>
          **Cloud Recipe Sharing App**
        </h1>
        <p style={{ color: '#777', fontSize: '1.1em' }}>
          User ID: <code style={{backgroundColor: '#eee', padding: '2px 5px', borderRadius: '3px'}}>{userId || 'N/A'}</code>
        </p>
        <p style={{ color: '#777', fontSize: '1.1em', marginTop: '5px' }}>
          **Persistence: Firebase Firestore**
        </p>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* TASK 3 INTEGRATION */}
        <FavoritesList />
        <RecommendationsList />

        <hr style={{ border: 'none', borderTop: '1px solid #ccc' }} />

        {/* Task 2 Component */}
        <SearchBar /> 

        {/* Task 0/1 Components */}
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  );
};

>>>>>>> 74a1cc385eceb06930a0cc877945e93fe7885fa9

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // New State for Pagination and Advanced Search Criteria
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
    
    // Do not proceed if criteria is null (shouldn't happen on initial search)
    if (!criteria && !currentCriteria) return;

    // Use currentCriteria if criteria is null (happens during pagination)
    const activeCriteria = criteria || currentCriteria;

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
  // This useEffect ensures that when the page state changes (not 1), the search runs again
  useEffect(() => {
    // Only run the search if the page changes AND we have criteria saved
    if (page !== 1 && currentCriteria) {
      // Pass the saved criteria and the new page number
      handleSearch(currentCriteria, page);
    }
  }, [page]); 

  // --- JSX Rendering ---
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight sm:text-5xl">
          GitHub Explorer
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Find developers using basic keywords or advanced criteria.
        </p>
      </header>
      
      {/* Search Component (Handles initial search and criteria setting) */}
      <div className="max-w-4xl mx-auto">
        <Search onSearch={(criteria) => handleSearch(criteria, 1)} />
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto">
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
              {users.map((user) => (
                // UserCard now receives the detailed user object
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
=======
    <Router>
      <Routes>
        {/* Route 1: Home page, rendering the main structure */}
        <Route path="/" element={<HomePageContent />} />
        
        {/* Route 2: Detail page for individual recipes (Task 1) */}
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
>>>>>>> 74a1cc385eceb06930a0cc877945e93fe7885fa9
  );
}

export default App;