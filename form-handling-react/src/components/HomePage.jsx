import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipesData from '../data.json';

const RecipeCard = ({ recipe }) => (
  <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
    <img className="w-full h-48 object-cover" src={recipe.image} alt={recipe.title} />
    
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.summary}</p>
      
      <Link 
        to={`/recipe/${recipe.id}`} 
        className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out"
      >
        View Recipe &rarr;
      </Link>
    </div>
  </div>
);

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setRecipes(recipesData);
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Delicious Recipes <span className="text-indigo-600">to Share</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500 mb-5">
          Browse our collection of world-class recipes.
        </p>
        
        <Link 
          to="/add"
          className="inline-block py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition duration-200"
        >
          + Add New Recipe
        </Link>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <footer className="text-center mt-12 py-4 text-gray-500 border-t border-gray-200">
        Recipe Sharing Platform &copy; 2024
      </footer>
    </div>
  );
};

export default HomePage;