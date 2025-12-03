import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    summary: '',
    ingredients: '',
    instructions: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['title', 'summary', 'ingredients', 'instructions'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setValidationError(`Please fill out the ${field} field.`);
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted Successfully!', formData);
      alert(`Recipe "${formData.title}" submitted! (Check console for data)`);
      // Optionally reset the form
      setFormData({
        title: '',
        image: '',
        summary: '',
        ingredients: '',
        instructions: '',
      });
    }
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-6 sm:p-10">
        
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Recipes
        </Link>
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Share Your <span className="text-indigo-600">Recipe</span>
          </h1>
          <p className="mt-2 text-md text-gray-500">
            Fill out the details below to add a new recipe to the platform.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Validation Error Display */}
          {validationError && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-medium text-center">{validationError}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className={labelClass}>Recipe Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className={inputClass}
              placeholder="e.g., Spicy Shrimp Scampi"
            />
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary" className={labelClass}>Short Summary</label>
            <textarea 
              id="summary" 
              name="summary" 
              rows="3"
              value={formData.summary} 
              onChange={handleChange} 
              className={inputClass}
              placeholder="A brief, appetizing description of the dish."
            ></textarea>
          </div>

          {/* Image URL (Optional for basic setup) */}
          <div>
            <label htmlFor="image" className={labelClass}>Image URL (Optional)</label>
            <input 
              type="url" 
              id="image" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              className={inputClass}
              placeholder="https://example.com/my-recipe-photo.jpg"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label htmlFor="ingredients" className={labelClass}>Ingredients (List each item on a new line)</label>
            <textarea 
              id="ingredients" 
              name="ingredients" 
              rows="5"
              value={formData.ingredients} 
              onChange={handleChange} 
              className={inputClass}
              placeholder="1 cup flour\n2 eggs\n..."
            ></textarea>
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className={labelClass}>Preparation Steps (List each step on a new line)</label>
            <textarea 
              id="instructions" 
              name="instructions" 
              rows="7"
              value={formData.instructions} 
              onChange={handleChange} 
              className={inputClass}
              placeholder="1. Mix ingredients\n2. Bake at 350°F\n..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit New Recipe
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;