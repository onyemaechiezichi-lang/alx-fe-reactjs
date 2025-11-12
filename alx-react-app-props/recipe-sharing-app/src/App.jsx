import React, { useState } from 'react';
import useRecipeStore from './store/useRecipeStore'; 

// --- Component 1: RecipeList (Reads state) ---
const RecipeList = () => {
  // Select the 'recipes' state from the store
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Available Recipes ({recipes.length})</h2>

      {recipes.length === 0 ? (
        <p className="text-gray-500 italic">No recipes added yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition duration-150">
              <h3 className="text-xl font-semibold text-indigo-600">{recipe.title}</h3>
              <p className="text-gray-600 mt-1">{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Component 2: AddRecipeForm (Writes state) ---
const AddRecipeForm = () => {
  // Select the 'addRecipe' action from the store
  const addRecipe = useRecipeStore(state => state.addRecipe);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Call the Zustand action
    addRecipe({ title: title.trim(), description: description.trim() });

    // Clear the form
    setTitle('');
    setDescription('');
    setIsAdding(false); // Close the form after submission
  };

  if (!isAdding) {
    return (
      <button 
        onClick={() => setIsAdding(true)} 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md">
        + Add New Recipe
      </button>
    );
  }

  return (
    <div className="bg-indigo-50 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title (e.g., Simple Salad)"
          className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short Description (e.g., Quick lunch for hot days)"
          rows="3"
          className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          required
        />
        <div className="flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={() => setIsAdding(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200">
            Cancel"
          </button>
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md">
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
};


// --- Main App Component ---
function App() {
  return (
    <>
      {/* Tailwind CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="min-h-screen bg-gray-100 p-8 font-sans">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
            Zustand Recipe Sharing Application
          </h1>
          <p className="text-gray-500 mt-2">Effortless state management with Zustand for a scalable application.</p>
        </header>

        <main className="max-w-4xl mx-auto space-y-8">
          {/* Add Recipe Form */}
          <AddRecipeForm />

          {/* Recipe List */}
          <RecipeList />
        </main>
      </div>
    </>
  );
}

export default App;
