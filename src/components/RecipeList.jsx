import { useState } from 'react'; // <-- IMPORT useState
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm.jsx'; // <-- ADD THE .jsx EXTENSION

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  // NEW STATE for tracking the recipe being edited
  const [editingId, setEditingId] = useState(null); 

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
              setEditing={setEditingId} // Pass setEditingId to close the form
            />
          ) : (
            // 2. Show Recipe Details and Buttons otherwise
            <>
              <h3>{recipe.title}</h3>
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
