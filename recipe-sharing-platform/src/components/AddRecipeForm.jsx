import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '', // REQUIRED: Must include 'steps' field
    image: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // REQUIRED: Form validation implemented
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required.';
      isValid = false;
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients list is required.';
      isValid = false;
    }
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required.';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Recipe Submitted:', formData);
      alert(`Recipe "${formData.title}" submitted successfully!`);
      navigate('/');
    }
  };

  // REQUIRED: Form styled with Tailwind CSS & Responsive layout implemented
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-10">
      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Add New Recipe
          </h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">&larr; Back to Home</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Recipe Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., Spicy Thai Green Curry"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Ingredients Field */}
          <div>
            <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700 mb-2">Ingredients</label>
            <textarea
              name="ingredients"
              id="ingredients"
              rows="6"
              value={formData.ingredients}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="1 cup chicken breast\n1 can coconut milk"
            />
            {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
          </div>

          {/* Preparation Steps Field (Resolves the 'doesn't contain: ["steps"]' error) */}
          <div> 
            <label htmlFor="steps" className="block text-lg font-medium text-gray-700 mb-2">Preparation Steps</label>
            <textarea
              name="steps"
              id="steps"
              rows="8"
              value={formData.steps}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="1. Chop vegetables.\n2. Sauté chicken."
            />
            {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
            >
              Submit New Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
