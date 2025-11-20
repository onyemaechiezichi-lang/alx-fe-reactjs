// src/services/githubService.js

// Note: We are using built-in fetch for API calls for maximum compatibility.

// ----------------------
// 1. Configuration
// ----------------------
// Ensure you are using the correct environment variable prefix for your setup (VITE_ or REACT_APP_).
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const API_BASE_URL = "https://api.github.com";
const SEARCH_URL = `${API_BASE_URL}/search/users`;

const headers = GITHUB_TOKEN
  ? {
      // Use Bearer token for modern API access
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    }
  : {
      // Unauthenticated requests are subject to strict rate limits
      Accept: "application/vnd.github.v3+json",
    };


// ----------------------
// 2. Query Builder
// ----------------------
/**
 * Constructs the advanced search query string for the GitHub Search API.
 * Uses 'keyword' for consistency, but handles the criteria structure.
 * * @param {object} criteria - Search criteria ({ keyword, location, minRepos })
 * @returns {string} The URL-encoded query string.
 */
const buildAdvancedQuery = ({ keyword, location, minRepos }) => {
    // Start query with the main keyword
    let query = keyword || "";

    // Append advanced criteria using GitHub search qualifiers
    if (location) query += ` location:${location}`;
    
    const minReposNum = parseInt(minRepos, 10);
    if (!isNaN(minReposNum) && minReposNum > 0) query += ` repos:>=${minReposNum}`;

    // Ensure the query is not empty before encoding
    if (query.trim() === "") {
        throw new Error("Search query must contain at least one criterion.");
    }

    return encodeURIComponent(query.trim());
};

// ----------------------
// 3. Advanced Search + Detailed User Fetch (The definitive function)
// ----------------------
/**
 * Performs advanced GitHub user search and fetches FULL user profiles
 * for detailed data (location, bio, public repos count, etc.).
 *
 * @param {object} criteria - Search criteria ({ keyword, location, minRepos })
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [perPage=10] - Number of results per page.
 * @returns {Promise<{ total_count:number, items:array }>}
 */
export const searchUsers = async (criteria, page = 1, perPage = 10) => {
    try {
        const query = buildAdvancedQuery(criteria);
        const url = `${SEARCH_URL}?q=${query}&page=${page}&per_page=${perPage}`;

        // 1. Initial Search Call
        const response = await fetch(url, { headers });

        // Handle rate limiting and other errors
        if (response.status === 403) {
            throw new Error(
                "GitHub API Rate Limit Exceeded or Forbidden (403). Try again later or use a GITHUB_TOKEN."
            );
        }
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`GitHub API Error: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();

        // 2. FETCH FULL PROFILE DETAILS for each user (CRITICAL for full data)
        const detailedProfiles = await Promise.all(
            data.items.map(async (user) => {
                try {
                    // Fetch full profile from user.url (e.g., /users/{username})
                    const detailsResponse = await fetch(user.url, { headers });
                    if (!detailsResponse.ok) {
                        console.warn(`Could not fetch details for user ${user.login}: ${detailsResponse.status}`);
                        return user; // Return basic data if detail fetch fails
                    }
                    const details = await detailsResponse.json();
                    return details; // Return the enriched, detailed profile
                } catch (error) {
                    console.error(`Error fetching detailed profile for ${user.login}:`, error);
                    return user; // Fallback to basic user data
                }
            })
        );

        return {
            total_count: data.total_count,
            items: detailedProfiles, // Items now contain full profile details
        };
    } catch (error) {
        // Re-throw the error for App.jsx to catch and display
        throw error;
    }
};
