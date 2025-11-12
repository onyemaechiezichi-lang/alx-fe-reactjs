import './App.css'; // Assuming you have a default CSS file
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div className="App" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>**Zustand Recipe Sharing App**</h1>
      <p>Demonstrating simple state management with Zustand.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  );
}

export default App;