import React from 'react';
import useRecipeStore from '../store/recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const style = {
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      border: '2px solid #007bff',
      borderRadius: '8px',
      fontSize: '1em',
      boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)',
      transition: 'border-color 0.3s'
    }
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search recipes by title or description..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={style.input}
    />
  );
};
export default SearchBar;