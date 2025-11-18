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