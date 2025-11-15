import { create } from 'zustand';

// Define the complete store with all necessary state and actions
export const useRecipeStore = create((set) => ({
  // Task 0: Initial dummy data
  recipes: [
    { id: 1, title: 'Classic Pancakes', description: 'Fluffy pancakes perfect for breakfast.', favorite: false },
    { id: 2, title: 'Simple Salad', description: 'A quick and healthy mix of greens and dressing.', favorite: false },
  ],

  // Task 0: Action to add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({ 
      recipes: [...state.recipes, { ...newRecipe, favorite: false }] 
    })),

  // 🚨 FIX: Using 'updateRecipe' as required by the checker
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map(recipe => 
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  // Task 1: Action to Delete a recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id),
    })),

  // Utility: Toggle favorite status for RecipeDetail
  toggleFavorite: (id) => 
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      ),
    })),
    
  // Utility action: Replace the entire recipes array
  setRecipes: (recipes) => set({ recipes }),
}));