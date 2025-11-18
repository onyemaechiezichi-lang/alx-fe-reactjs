import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = ({ recipe, setEditing }) => {
  // 🚨 FIX: Select the renamed action 'updateRecipe' from the store
  const updateRecipe = useRecipeStore((state) => state.updateRecipe); 
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      console.error('Title and Description cannot be empty.');
      return;
    }

    // Call the Zustand action to update the recipe
    updateRecipe({ id: recipe.id, title, description });
    
    // Exit editing mode in the parent component
    setEditing(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px dashed #4CAF50', padding: '15px', borderRadius: '8px', background: '#f9fff9' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>Editing Recipe: {recipe.id}</h4>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        required
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe description"
        rows="2"
        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      
      <button 
        type="submit"
        style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
      >
        Save Changes
      </button>
      
      <button 
        type="button" 
        onClick={() => setEditing(null)} 
        style={{ padding: '8px 15px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;