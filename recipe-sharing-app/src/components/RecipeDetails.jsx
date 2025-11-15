import { useParams, Link } from 'react-router-dom'; // <-- NEW IMPORTS
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm.jsx'; // Existing component
import { useState } from 'react';

const RecipeDetails = () => {
  // Get the recipe ID from the URL parameter (e.g., /recipes/123)
  const { recipeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  // Convert ID from URL string to a number for matching
  const idToFind = Number(recipeId);

  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === idToFind)
  );

  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  if (!recipe) {
    return <h2>Recipe Not Found</h2>;
  }

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    alert(`Recipe "${recipe.title}" deleted.`);
    // Note: For a real app, you would navigate back here
  };

  return (
    <div style={{ padding: '20px', border: '1px solid black' }}>
      <Link to="/" style={{ display: 'block', marginBottom: '15px' }}>
        &larr; Back to Home
      </Link>

      {isEditing ? (
        <EditRecipeForm recipe={recipe} setEditing={setIsEditing} />
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>

          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
            Delete Recipe
          </button>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
