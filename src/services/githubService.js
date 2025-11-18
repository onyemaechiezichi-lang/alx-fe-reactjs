import axios from "axios";

// --- 1. Configuration & Authentication ---
// FIX for Vite: Use import.meta.env instead of process.env
// NOTE: Ensure your REACT_APP_GITHUB_TOKEN is set in your .env file
const GITHUB_TOKEN = import.meta.env.REACT_APP_GITHUB_TOKEN;
const API_BASE_URL = 'https://api.github.com';
const SEARCH_URL = `${API_BASE_URL}/search/users`;

const headers = GITHUB_TOKEN ? {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
} : {
  Accept: 'application/vnd.github.v3+json',
};

// --- 2. Single User Fetch (Uses axios, from your previous code) ---
/**
 * Fetches a single GitHub user's detailed profile by username.
 * @param {string} username - The login name of the user.
 * @returns {Promise<object>} The full user profile data.
 */
export async function fetchUserData(username) {
  try {
    // Note: Using headers here is good practice, though often not required for public user profiles
    const response = await axios.get(`${API_BASE_URL}/users/${username}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching single user:", error);
    const errorMessage = error.response ? error.response.data.message : "User not found";
    throw new Error(errorMessage);
  }
}

// --- 3. Advanced Search Query Builder ---
/**
 * Constructs the advanced search query string for the GitHub Search API.
 * @param {object} criteria - Search criteria.
 * @returns {string} The constructed URL-encoded query string (e.g., "react developer location:london repos:>=10").
 */
const buildAdvancedQuery = ({ username, location, minRepos }) => {
  let query = username || '';

  if (location) {
    query += ` location:${location}`;
  }

  // Use the correct qualifier for minimum count
  if (minRepos && minRepos > 0) {
    query += ` repos:>=${minRepos}`; 
  }

  return encodeURIComponent(query.trim());
};

// --- 4. Advanced Search Function (Uses fetch, from your robust search code) ---
/**
 * Fetches GitHub users based on advanced search criteria with pagination and auth.
 * @param {object} criteria - Advanced search criteria.
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [perPage=10] - Number of results per page.
 * @returns {Promise<object>} The API response including items (user list) and total_count.
 */
export const searchUsers = async (criteria, page = 1, perPage = 10) => {
  const query = buildAdvancedQuery(criteria);

  // Validation
  if (!query) {
      throw new Error("A username or search keyword is required for the search.");
  }

  const url = `${SEARCH_URL}?q=${query}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url, { headers });

    // Handle rate limiting (403) and general API errors
    if (response.status === 403) {
      throw new Error("API Rate Limit Exceeded or Forbidden. Check your token or rate limit status.");
    }
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    throw error;
  }
};