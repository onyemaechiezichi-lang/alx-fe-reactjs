import { create } from 'zustand';

// Define the complete store with all necessary state and actions
export const useRecipeStore = create((set) => ({
  // Initial dummy data from the previous version, ensuring it supports the 'favorite' field
  recipes: [
    { id: 1, title: 'Classic Pancakes', description: 'Fluffy pancakes perfect for breakfast.', favorite: false },
    { id: 2, title: 'Simple Salad', description: 'A quick and healthy mix of greens and dressing.', favorite: false },
  ],

  // Action: Add a new recipe (from both versions)
  addRecipe: (newRecipe) =>
    set((state) => ({ 
      // Ensure new recipes also get the 'favorite' property
      recipes: [...state.recipes, { ...newRecipe, favorite: false }] 
    })),

  // Action: Edit/Update a recipe (from the second version)
  editRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map(recipe => 
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  // Action: Delete a recipe (from the second version)
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id),
    })),

  // Action: Toggle favorite status (for the detail view)
  toggleFavorite: (id) => 
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      ),
    })),
    
  // Action: Replace the entire recipes array (setRecipes from the first version)
  setRecipes: (recipes) => set({ recipes }),
}));

// We use a named export 'useRecipeStore' for consistency
// export default useRecipeStore;