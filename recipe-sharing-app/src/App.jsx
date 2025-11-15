import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Using explicit .jsx extensions to ensure imports resolve correctly.
import AddRecipeForm from './components/AddRecipeForm.jsx'; 
import RecipeList from './components/RecipeList.jsx';
import RecipeDetail from './components/RecipeDetail.jsx'; 

/**
 * Component that renders the original Task 0 structure (title, form, list)
 * including the specific inline styling.
 */
const HomePageContent = () => (
  <div 
    className="App" 
    style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif' 
    }}
  >
    <h1>**Zustand Recipe Sharing App**</h1>
    <p>Demonstrating simple state management with Zustand.</p>
    
    {/* Task 0: Original Component Layout */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <AddRecipeForm />
      <RecipeList />
    </div>
  </div>
);


function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: Home page, rendering the Task 0 structure */}
        <Route path="/" element={<HomePageContent />} />
        
        {/* Route 2: Detail page for individual recipes (Task 1) */}
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;