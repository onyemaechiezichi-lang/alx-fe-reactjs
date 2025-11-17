// src/App.jsx
import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        GitHub User Search
      </h1>

      {/* Original project setup message */}
      <p className="text-center mb-8 text-gray-700">
        Project setup successful!
      </p>

      {/* Search component */}
      <Search />
    </div>
  );
}

export default App;
