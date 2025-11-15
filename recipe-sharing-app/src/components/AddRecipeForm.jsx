import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simple validation (Task 0 feature)
    if (!title.trim() || !description.trim()) {
      alert('Title and Description cannot be empty.');
      return;
    }

    addRecipe({
      id: Date.now(),
      title,
      description,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Add Recipe</h2>

      <input
        type="text"
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br /><br />

      <textarea
        placeholder="Recipe description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br /><br />

      <button type="submit">Add Recipe</button>
    </form>
  );
};
export default AddRecipeForm;