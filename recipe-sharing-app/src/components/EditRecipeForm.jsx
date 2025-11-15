import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = ({ recipe, setEditing }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ ...recipe, title, description });
    setEditing(null); // Exit edit mode after saving
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
    >
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" style={{ marginRight: '10px' }}>Save</button>
      <button type="button" onClick={() => setEditing(null)}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;