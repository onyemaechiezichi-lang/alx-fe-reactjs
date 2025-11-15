import { useState } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm.jsx'; 
import { useEffect } from 'react'; 

const RecipeList = () => {
  // Select state and actions
  // 🚨 TASK 2 CHANGE: Read from filteredRecipes instead of recipes
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [editingId, setEditingId] = useState(null);
  
  // Rerun filter when component mounts or recipes array changes (safety)
  const recipes = useRecipeStore((state) => state.recipes);
  useEffect(() => {
      filterRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes.length]); // Dependency on recipes.length ensures it updates after add/delete


  return (
    <div>
      <h2>Recipe List ({filteredRecipes.length} results)</h2>
      {filteredRecipes.length === 0 && (
        <p>
          {searchTerm 
            ? `No recipes found matching "${searchTerm}".` 
            : "No recipes added yet."
          }
        </p>
      )}

      {filteredRecipes.map((recipe) => (
        <div 
          key={recipe.id} 
          style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}
        >
          {editingId === recipe.id ? (
            // TASK 1 EDITING MODE: Display Edit form
            <EditRecipeForm recipe={recipe} setEditing={setEditingId} />
          ) : (
            // TASK 0/1 DISPLAY MODE
            <>
              {/* TASK 1 LINK: Added for detail view */}
              <Link 
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: 'none', color: '#007bff' }}
              >
                <h3 style={{ margin: '0 0 5px 0' }}>{recipe.title}</h3> 
              </Link>
              <p style={{ margin: '0 0 10px 0', fontSize: '0.9em' }}>{recipe.description}</p>
              
              {/* TASK 1 BUTTONS */}
              <button 
                onClick={() => setEditingId(recipe.id)}
                style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteRecipe(recipe.id)}
                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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