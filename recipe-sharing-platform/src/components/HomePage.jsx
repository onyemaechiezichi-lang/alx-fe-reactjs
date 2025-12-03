import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// RENAMED from 'recipesData' to 'recipeData' for consistency with common usage
import recipeData from '../data.json'; 

const RecipeCard = ({ recipe }) => (
  // ADDED: Enhanced shadow on the card for better visual appeal
  <div className="bg-white rounded-xl shadow-xl overflow-hidden 
                  transform transition duration-300 
                  hover:shadow-2xl hover:scale-[1.03]"> 
    
    <img 
      className="w-full h-48 object-cover" 
      src={recipe.image} 
      alt={recipe.title} 
    />
        
    <div className="p-5"> {/* Adjusted padding */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h3> {/* Enhanced title size */}
      <p className="text-gray-600 text-base mb-4 line-clamp-2">{recipe.summary}</p> {/* Adjusted font size */}
          
      <Link 
        to={`/recipe/${recipe.id}`} 
        // ADDED: Clear button styling for better interaction (Task 3 requirement)
        className="inline-block py-2 px-4 bg-blue-600 text-white font-semibold 
                   rounded-lg hover:bg-blue-700 transition duration-150"
      >
        View Recipe &rarr;
      </Link>
    </div>
  </div>
);

const HomePage = () => {
  // Changed 'recipesData' to 'recipeData' to match the import above
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setRecipes(recipeData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-indigo-600 font-medium">Loading Recipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Delicious Recipes <span className="text-indigo-600">to Share</span>
        </h1>
        <p className="mt-3 text-xl text-gray-600 mb-6"> {/* Enhanced text size */}
          Browse our collection of world-class recipes.
        </p>
        
        <Link 
          to="/add"
          className="inline-block py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-xl transition duration-200"
        >
          + Add New Recipe
        </Link>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <footer className="text-center mt-16 py-6 text-gray-500 border-t border-gray-200">
        Recipe Sharing Platform &copy; 2024
      </footer>
    </div>
  );
};

export default HomePage;
