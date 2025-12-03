import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
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
