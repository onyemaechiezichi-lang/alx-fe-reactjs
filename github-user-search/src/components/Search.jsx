import React, { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

function Search() {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [minRepos, setMinRepos] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResults([]);

        try {
            const data = await fetchAdvancedUsers({
                keyword,
                location,
                minRepos,
            });

            if (data.items && data.items.length > 0) {
                setResults(data.items);
            } else {
                setError("Looks like we can’t find the user");
            }
        } catch (err) {
            setError("Looks like we can’t find the user");
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form
                onSubmit={handleSearch}
                className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username or Keywords
                        </label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Search GitHub users..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                            placeholder="e.g. Lagos, London"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Min Repos
                        </label>
                        <input
                            type="number"
                            value={minRepos}
                            onChange={(e) => setMinRepos(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                            placeholder="e.g. 10"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg w-full md:w-auto"
                >
                    Search GitHub
                </button>
            </form>

            {/* Loading */}
            {loading && <p className="text-center text-indigo-600">Loading...</p>}

            {/* Error */}
            {error && (
                <p className="text-center text-red-500 font-medium">{error}</p>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 bg-white rounded-xl shadow border"
                        >
                            <img
                                src={user.avatar_url}
                                alt="avatar"
                                className="w-16 h-16 rounded-full mb-2"
                            />
                            <h3 className="font-semibold">{user.login}</h3>
                            <a
                                href={user.html_url}
                                target="_blank"
                                className="text-indigo-600 underline"
                                rel="noreferrer"
                            >
                                View Profile
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
