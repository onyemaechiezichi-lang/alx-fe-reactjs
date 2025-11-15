import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  // Task 0: Initial recipes (main list)
  recipes: [
    { id: 1, title: 'Classic Pancakes', description: 'Fluffy pancakes perfect for breakfast.', favorite: false },
    { id: 2, title: 'Simple Salad', description: 'A quick and healthy mix of greens and dressing.', favorite: false },
  ],

  // Task 2: Search and Filter State
  searchTerm: '',
  filteredRecipes: [], // Will hold the list displayed in RecipeList

  // Task 0: Action to add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, { ...newRecipe, favorite: false }];
      // Re-run filter after adding to keep filtered list accurate
      get().filterRecipes(); 
      return { recipes: updatedRecipes };
    }),

  // Task 1: Action to update a recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      );
      // Re-run filter after updating
      get().filterRecipes(); 
      return { recipes: updatedRecipes };
    }),

  // Task 1: Action to Delete a recipe
  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
      // Re-run filter after deleting
      get().filterRecipes(); 
      return { recipes: updatedRecipes };
    }),

  // Task 1 Utility: Toggle favorite status for RecipeDetail
  toggleFavorite: (id) =>
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      ),
    })),

  // Task 2 Action: Update search term and trigger filtering immediately
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    // Important: call filterRecipes right after setting the term
    get().filterRecipes();
  },

  // Task 2 Action: Filtering logic
  filterRecipes: () => set(state => {
    const term = state.searchTerm.toLowerCase();
    const results = state.recipes.filter(recipe =>
      // Filters by title OR description (expanded search criteria)
      recipe.title.toLowerCase().includes(term) || 
      recipe.description.toLowerCase().includes(term) 
    );
    return { filteredRecipes: results };
  }),

  // Utility action: Replace the entire recipes array
  setRecipes: (recipes) => set({ recipes }),
}));

// Run initial filter on load to populate filteredRecipes with all items
useRecipeStore.getState().filterRecipes();
export default useRecipeStore;