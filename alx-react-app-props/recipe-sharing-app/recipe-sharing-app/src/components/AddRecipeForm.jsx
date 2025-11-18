import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  // Select the 'addRecipe' action from the store
  const addRecipe = useRecipeStore(state => state.addRecipe);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill in both the title and description.');
      return;
    }

    // Call the Zustand action to add the new recipe
    addRecipe({ 
      id: Date.now(), // Simple unique ID generation
      title, 
      description 
    });
    
    // Clear the form fields
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Add New Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title (e.g., Lemon Meringue)"
        style={{ marginBottom: '10px', padding: '8px', width: '100%', boxSizing: 'border-box' }}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description/Summary"
        rows="4"
        style={{ marginBottom: '10px', padding: '8px', width: '100%', boxSizing: 'border-box' }}
        required
      />
      <button 
        type="submit"
        style={{ padding: '10px 15px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Add Recipe 🚀
      </button>
    </form>
  );
};

export default AddRecipeForm;