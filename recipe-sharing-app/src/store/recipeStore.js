import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [],
      addRecipe: (newRecipe) =>
        set((state) => ({
          recipes: [...state.recipes, newRecipe],
        })),
      deleteRecipe: (recipeId) =>
        set((state) => ({
          recipes: state.recipes.filter(recipe => recipe.id !== recipeId),
        })),
      // NEW ACTION REQUIRED BY TASK: updateRecipe
      updateRecipe: (recipeId, updatedRecipe) =>
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
          ),
        })),
      setRecipes: (recipes) => set({ recipes }),
    }),
    {
      name: 'recipe-storage', // Key used in localStorage
    }
  )
);

