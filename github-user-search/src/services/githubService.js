// Note: We are using built-in fetch for API calls for maximum compatibility.
import axios from "axios";

export const fetchAdvancedUsers = async ({ keyword, location, minRepos }) => {
    // Build GitHub search query
    let query = keyword ? `${keyword}` : "";

    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const url = `https://api.github.com/search/users?q=${query}`;

    const response = await axios.get(url);
    return response.data;
};
// ----------------------
// 1. Configuration
// ----------------------
// Ensure you are using the correct environment variable prefix for your setup (VITE_ or REACT_APP_).
// We'll use VITE_GITHUB_TOKEN here as it's common for Vite projects.
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
 * This is non-disruptive, as it handles basic username searches (TASK 0/1) 
 * and advanced searches (TASK 2).
 * * @param {object} criteria - Search criteria ({ username, location, minRepos })
 * @returns {string} The URL-encoded query string.
 */
const buildAdvancedQuery = ({ username, location, minRepos }) => {
  let query = username || "";

  // Append advanced criteria using GitHub search qualifiers
  if (location) query += ` location:${location}`;
  if (minRepos && minRepos > 0) query += ` repos:>=${minRepos}`;

  // Ensure the query is not empty before encoding
  if (query.trim() === "") {
      // Throw an error early if no criteria is provided
      throw new Error("Search query must contain at least one criterion.");
  }
  
  return encodeURIComponent(query.trim());
};

// ----------------------
// 3. Advanced Search + Detailed User Fetch (Merged Logic)
// ----------------------
/**
 * Performs advanced GitHub user search and returns FULL user profiles 
 * (including location, repos count, etc., via follow-up calls).
 *
 * @param {object} criteria - Search criteria ({ username, location, minRepos })
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [perPage=10] - Number of results per page.
 * @returns {Promise<{ total_count:number, items:array }>}
 */
export const searchUsers = async (criteria, page = 1, perPage = 10) => {
  try {
    const query = buildAdvancedQuery(criteria);
    const url = `${SEARCH_URL}?q=${query}&page=${page}&per_page=${perPage}`;

    // 1. Initial Search Call (uses fetch)
    const response = await fetch(url, { headers });

    // Handle rate limiting and other errors
    if (response.status === 403) {
      throw new Error(
        "GitHub API Rate Limit Exceeded or Forbidden (403). Try again later."
      );
    }
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API Error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const data = await response.json();

    // 2. FETCH FULL PROFILE DETAILS for each user 
    // This is the CRITICAL step for TASK 2 to ensure detailed data is available.
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
      items: detailedProfiles, 
    };
  } catch (error) {
    // Re-throw the error for App.jsx to catch and display
    throw error;
  }
};
