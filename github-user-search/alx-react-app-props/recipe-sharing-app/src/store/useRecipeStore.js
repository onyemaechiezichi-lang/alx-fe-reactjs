import { create } from 'zustand';

// Define the store
// The 'set' function is used to update the state
const useRecipeStore = create(set => ({
  // State: An array to hold all recipe objects
  recipes: [
    // Initial dummy data for demonstration
    { id: 1, title: 'Classic Pancakes', description: 'Fluffy pancakes perfect for breakfast.' },
    { id: 2, title: 'Simple Salad', description: 'A quick and healthy mix of greens and dressing.' },
  ],

  // Action: Function to add a new recipe
  addRecipe: (newRecipe) => 
    set(state => ({ 
      recipes: [...state.recipes, newRecipe] 
    })),

  // Action: Function to replace the entire recipes array (e.g., for initialization or loading)
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;