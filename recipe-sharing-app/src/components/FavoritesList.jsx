import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore.js'; // FIX: Added .js extension

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Filter the main recipe list to get the full objects for favorited IDs
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  const style = {
    card: {
      padding: '10px',
      borderLeft: '4px solid #f1c40f', // Gold highlight
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: '#fffbe0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      margin: 0,
      fontSize: '1.1em',
      color: '#2c3e50',
    },
    description: {
      margin: 0,
      fontSize: '0.9em',
      color: '#7f8c8d',
    },
    button: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.8em',
    }
  };

  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #f1c40f', paddingBottom: '5px' }}>❤️ My Favorites ({favoriteRecipes.length})</h2>
      
      {favoriteRecipes.length === 0 ? (
        <p style={{ color: '#e67e22' }}>You haven't added any favorites yet!</p>
      ) : (
        favoriteRecipes.map(recipe => (
          <div key={recipe.id} style={style.card}>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
              <div>
                <p style={style.title}>{recipe.title}</p>
                <p style={style.description}>{recipe.description.substring(0, 50)}...</p>
              </div>
            </Link>
            <button 
              onClick={() => removeFavorite(recipe.id)}
              style={style.button}
            >
              Unfavorite
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;