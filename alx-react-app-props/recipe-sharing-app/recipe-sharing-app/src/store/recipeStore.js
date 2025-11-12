import { create } from 'zustand';
export const useRecipeStore = create((set) => ({
  // Application state
  recipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),
  // Replace or reset the recipes list
  setRecipes: (recipes) => set({ recipes }),
}));