<<<<<<< HEAD
import { useState } from "react";
import Search from "./Search";

function App() {
  const [advancedResults, setAdvancedResults] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">GitHub User Search</h1>
      <Search onAdvancedSearch={setAdvancedResults} />

      {/* Optional: display advanced search results outside of Search */}
      {advancedResults.length > 0 && (
        <div className="mt-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Advanced Results</h2>
          {advancedResults.map((user) => (
            <div key={user.id} className="flex items-center p-4 border rounded mb-2">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full mr-4"
              />
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.login}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
=======
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#343a40',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '1.1em',
    padding: '5px 10px',
    borderRadius: '3px',
    transition: 'background-color 0.3s'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

export default Navbar;
>>>>>>> b2229d9f47719c2abf2e611384dbe8353ed23606
