import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore.js'; // FIX: Added .js extension

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);

  const style = {
    container: {
      backgroundColor: '#ecf0f1',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '20px',
    },
    card: {
      padding: '10px',
      border: '1px solid #bdc3c7',
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      margin: 0,
      fontSize: '1em',
      color: '#2980b9',
    },
    button: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.8em',
      marginLeft: '10px',
    }
  };

  return (
    <div style={style.container}>
      <h2 style={{ color: '#2980b9', marginTop: 0, borderBottom: '2px solid #2980b9', paddingBottom: '5px' }}>✨ Recommended for You</h2>
      
      {recommendations.length === 0 ? (
        <p style={{ color: '#3498db' }}>Favorite some recipes to get recommendations!</p>
      ) : (
        recommendations.map(recipe => (
          <div key={recipe.id} style={style.card}>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
              <p style={style.title}>
                {recipe.title}
              </p>
            </Link>
            <button 
              onClick={() => toggleFavorite(recipe.id)}
              style={style.button}
            >
              Favorite
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;