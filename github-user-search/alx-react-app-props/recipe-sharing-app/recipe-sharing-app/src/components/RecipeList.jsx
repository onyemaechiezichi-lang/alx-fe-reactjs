import { useRecipeStore } from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={styles.container}>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one above!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={styles.recipeCard}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
  },
  recipeCard: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
};
export default RecipeList;
