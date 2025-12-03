import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipesData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the recipe based on the ID from the URL
    const foundRecipe = recipesData.find(r => r.id === parseInt(id));
    
    const timer = setTimeout(() => {
      setRecipe(foundRecipe);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-indigo-600 font-medium">Loading Recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <p className="text-2xl text-red-600 font-semibold mb-4">Recipe Not Found</p>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-6 sm:p-10">
        
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Recipes
        </Link>

        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {recipe.title}
          </h1>
          <p className="text-xl text-gray-500">{recipe.summary}</p>
        </header>

        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-80 object-cover rounded-lg shadow-md mb-8" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <section>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="pl-1">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="font-medium">
                  <span className="font-normal">{step}</span>
                </li>
              ))}
            </ol>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;