import { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- NEW IMPORT
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm.jsx';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [editingId, setEditingId] = useState(null); // State for tracking the recipe being edited

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 && <p>No recipes added yet.</p>}

      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px' }}>
          {editingId === recipe.id ? (
            // 1. Show Edit Form if this recipe is being edited
            <EditRecipeForm 
              recipe={recipe} 
              setEditing={setEditingId} 
            />
          ) : (
            // 2. Show Recipe Details and Buttons otherwise
            <>
              {/* Link to the RecipeDetails page using the recipe ID */}
              <Link to={`/recipes/${recipe.id}`}> 
                <h3>{recipe.title}</h3> 
              </Link>
              <p>{recipe.description}</p>
              
              <button onClick={() => setEditingId(recipe.id)}>Edit</button> 
              <button onClick={() => deleteRecipe(recipe.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
