import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = ({ recipe, setEditing }) => {
  // Get the edit action from the store
  const editRecipe = useRecipeStore((state) => state.editRecipe);
  // Initialize local state with current recipe values
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the store action to update the recipe
    editRecipe(recipe.id, { title, description });
    setEditing(false); // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <h4>Edit Recipe</h4>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => setEditing(false)} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;
