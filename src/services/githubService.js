// src/services/githubService.js
import axios from "axios";

// Fetch single GitHub user by username
export async function fetchUserData(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
}

// Advanced search for multiple users
const SEARCH_URL = "https://api.github.com/search/users";

export async function fetchAdvancedUsers({ username, location, minRepos }) {
  let query = "";

  // Build GitHub search query dynamically
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>${minRepos} `;

  const url = `${SEARCH_URL}?q=${encodeURIComponent(query.trim())}`;

  try {
    const response = await axios.get(url);
    return response.data.items; // Return list of users
  } catch (error) {
    throw new Error("No users found with these criteria.");
  }
}