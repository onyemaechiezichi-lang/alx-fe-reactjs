// src/services/githubService.js
import axios from "axios";

export async function fetchUserData(username) {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}
