import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [editingId, setEditingId] = useState(null);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 && <p>No recipes added yet.</p>}

      {recipes.map((recipe) => (
        <div 
          key={recipe.id} 
          style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px' }}
        >
          {editingId === recipe.id ? (
            <EditRecipeForm 
              recipe={recipe} 
              setEditing={setEditingId} 
            />
          ) : (
            <>
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
              </Link>
              <p>{recipe.description}</p>
              <button onClick={() => setEditingId(recipe.id)}>Edit</button>
              <button 
                onClick={() => deleteRecipe(recipe.id)} 
                style={{ marginLeft: '10px' }}
              >
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
