import { Routes, Route } from 'react-router-dom'; // <-- NEW IMPORTS
import AddRecipeForm from './components/AddRecipeForm.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetails from './components/RecipeDetails.jsx'; // <-- NEW IMPORT

// New Home Component to display the form and list on the root route
const Home = () => (
  <div>
    <AddRecipeForm />
    <RecipeList />
  </div>
);

function App() {
  return (
    <div>
      <h1>Recipe Sharing Application</h1>

      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Route for individual recipe details, using the ID parameter */}
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
