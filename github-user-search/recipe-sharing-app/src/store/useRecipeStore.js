import create from 'zustand';

// Initial mock recipes (helpful for testing)
const initialRecipes = [
  { id: 1, title: 'Classic Tomato Pasta', description: 'A quick and easy weeknight dinner.', ingredients: ['Pasta', 'Tomato Sauce', 'Basil'] },
  { id: 2, title: 'Spicy Chicken Curry', description: 'A flavorful dish with a fiery kick.', ingredients: ['Chicken', 'Curry Paste', 'Coconut Milk'] },
];

const useRecipeStore = create((set) => ({
  // State
  recipes: initialRecipes,

  // Actions
  /**
   * Adds a new recipe to the state.
   * @param {object} newRecipe - The recipe object { title, description }
   */
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [
      ...state.recipes,
      {
        ...newRecipe,
        id: Date.now(), // Ensure a unique ID for the key
      },
    ],
  })),

  /**
   * Sets the entire recipes array.
   * @param {array} recipes - The new array of recipes
   */
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
