import { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "./services/githubService";

function Search({ onAdvancedSearch }) {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [userData, setUserData] = useState(null);
  const [advancedUsers, setAdvancedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Basic Search
  async function handleSearch(e) {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
    } catch {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  }

  // Advanced Search
  async function handleAdvancedSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAdvancedUsers([]);

    try {
      const users = await fetchAdvancedUsers({ username, location, minRepos });
      setAdvancedUsers(users);
      if (onAdvancedSearch) onAdvancedSearch(users);
    } catch {
      setError("No users found with these criteria.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      {/* Basic Search Form */}
      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {userData && (
        <div className="border p-4 rounded shadow text-center mb-6">
          <img src={userData.avatar_url} alt={userData.login} className="w-24 h-24 rounded-full mx-auto mb-2" />
          <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View GitHub Profile
          </a>
        </div>
      )}

      {/* Advanced Search Form */}
      <form onSubmit={handleAdvancedSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Minimum Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Advanced Search
        </button>
      </form>

      {/* Advanced Search Results */}
      {advancedUsers.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold">Advanced Search Results</h3>
          {advancedUsers.map((user) => (
            <div key={user.id} className="p-4 border rounded shadow flex items-center">
              <img src={user.avatar_url} alt="" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <p className="font-semibold">{user.login}</p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;