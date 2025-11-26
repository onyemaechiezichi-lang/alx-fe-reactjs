import { create } from 'zustand';
import { doc, setDoc } from 'firebase/firestore';

// --- Global Variable Retrieval (MANDATORY) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Firestore Document Path Utility
const getRecipesDocRef = (db, uid) => doc(db, 'artifacts', appId, 'users', uid, 'data', 'recipes_data');

// Function to calculate simple recommendations based on the current favorites
const calculateRecommendations = (recipes, favorites) => {
  if (favorites.length === 0) {
    // If no favorites, recommend the first two non-favorited recipes
    return recipes.filter(r => !favorites.includes(r.id)).slice(0, 2);
  }

  // Simple recommendation: Find recipes with similar ingredients/categories 
  // For this mock data, we will just recommend the next few recipes that aren't favorited
  // In a real app, this would use a robust recommendation engine.
  const recommended = recipes.filter(r => !favorites.includes(r.id));

  // Limit to 3 recommendations
  return recommended.slice(0, 3);
};

// --- Task 4, Step 2: Firestore Write Action ---
// This function is responsible for writing the current state (recipes and favorites) to Firestore.
const writeToCloud = async (state) => {
  if (!state.db || !state.userId) {
    // This is expected if the store action is called before Firebase is fully initialized in App.jsx
    console.warn("Attempted to write to cloud before DB or User ID was ready.");
    return;
  }

  try {
    const docRef = getRecipesDocRef(state.db, state.userId);
    
    // We only need to save the recipes array and the favorites array (of IDs)
    await setDoc(docRef, {
      recipes: state.recipes,
      favorites: state.favorites,
    });
    // console.log("State successfully written to Firestore.");
  } catch (e) {
    console.error("Error writing document to Firestore: ", e);
  }
};


// --- Zustand Store Definition ---
const useRecipeStore = create((set, get) => ({
  // Task 4: Persistence State
  db: null,
  userId: null,

  // Task 0: Initial recipes (main list)
  recipes: [
    { id: '1', title: 'Classic Pancakes', description: 'Fluffy pancakes perfect for breakfast.', ingredients: ['flour', 'milk', 'eggs'], steps: ['Mix ingredients.', 'Pour onto griddle.', 'Flip when bubbly.'], category: 'breakfast' },
    { id: '2', title: 'Simple Salad', description: 'A quick and healthy mix of greens and dressing.', ingredients: ['lettuce', 'tomato', 'vinaigrette'], steps: ['Chop vegetables.', 'Mix with dressing.', 'Serve immediately.'], category: 'lunch' },
    { id: '3', title: 'Beef Stir Fry', description: 'Savory strips of beef and crisp vegetables.', ingredients: ['beef', 'broccoli', 'soy sauce', 'rice'], steps: ['Cook rice.', 'Fry beef.', 'Add vegetables and sauce.'], category: 'dinner' },
  ],

  // Task 3: Favorites and Recommendations State
  favorites: ['1'], // Stores IDs of favorited recipes. '1' is favorited by default.
  recommendations: [], // Updated after favorites change

  // Task 2: Search and Filter State
  searchTerm: '',
  filteredRecipes: [],

  // --- Task 4 Actions: Setter for Cloud Status ---
  setDB: (dbInstance) => set({ db: dbInstance }),
  setUserId: (uid) => set({ userId: uid }),

  // Action used by App.jsx to load data from Firestore (Task 4)
  setRecipesAndFavorites: (recipes, favorites) => {
    set({ recipes, favorites });
    // IMPORTANT: After loading new data, re-run filtering and recommendation generation
    get().filterRecipes();
    get().generateRecommendations();
  },

  // --- Task 0/1/4 Actions: CRUD Operations ---
  addRecipe: (newRecipe) => {
    set((state) => {
      const updatedRecipes = [...state.recipes, { ...newRecipe, id: crypto.randomUUID(), ingredients: (newRecipe.ingredients || '').split('\n'), steps: (newRecipe.steps || '').split('\n'), category: newRecipe.category || 'misc' }];
      get().filterRecipes();
      writeToCloud({ ...state, recipes: updatedRecipes }); // Write to cloud
      return { recipes: updatedRecipes };
    });
  },

  updateRecipe: (updatedRecipe) => {
    set((state) => {
      const updatedRecipes = state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe, ingredients: (updatedRecipe.ingredients || '').split('\n'), steps: (updatedRecipe.steps || '').split('\n') } : recipe
      );
      get().filterRecipes();
      writeToCloud({ ...state, recipes: updatedRecipes }); // Write to cloud
      return { recipes: updatedRecipes };
    });
  },

  deleteRecipe: (id) => {
    set((state) => {
      const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
      const updatedFavorites = state.favorites.filter(favId => favId !== id); // Also remove from favorites
      
      get().filterRecipes();
      get().generateRecommendations(); // Update recommendations after delete
      writeToCloud({ ...state, recipes: updatedRecipes, favorites: updatedFavorites }); // Write to cloud
      return { recipes: updatedRecipes, favorites: updatedFavorites };
    });
  },

  // --- Task 3/4 Action: Toggle Favorite ---
  toggleFavorite: (id) => {
    set((state) => {
      let updatedFavorites;
      if (state.favorites.includes(id)) {
        updatedFavorites = state.favorites.filter(favId => favId !== id);
      } else {
        updatedFavorites = [...state.favorites, id];
      }
      
      get().generateRecommendations(); // Update recommendations immediately
      writeToCloud({ ...state, favorites: updatedFavorites }); // Write to cloud
      return { favorites: updatedFavorites };
    });
  },

  // --- Task 3 Action: Generate Recommendations ---
  generateRecommendations: () => {
    set(state => {
      const recommendedRecipes = calculateRecommendations(state.recipes, state.favorites);
      return { recommendations: recommendedRecipes };
    });
  },

  // --- Task 2 Actions: Search and Filter ---
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () => set(state => {
    const term = state.searchTerm.toLowerCase();
    const results = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term) || 
      recipe.description.toLowerCase().includes(term) 
    );
    return { filteredRecipes: results };
  }),
}));

// Run initial actions on load
useRecipeStore.getState().filterRecipes();
useRecipeStore.getState().generateRecommendations();

export default useRecipeStore;