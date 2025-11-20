// src/services/githubService.js

// Note: We are using built-in fetch for API calls for maximum compatibility.

// Base URL for search endpoint
const API_BASE_URL = 'https://api.github.com/search/users';
// Base URL for user details (used later)
const USER_DETAILS_BASE_URL = 'https://api.github.com/users';

// Token configuration
// Use Bearer token authorization if available, fallback to empty string
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;


/**
 * Fetches GitHub users based on criteria (keyword, location, minRepos) and pagination,
 * and performs a follow-up fetch to get detailed user data.
 * * @param {object} criteria - Object containing keyword, location, and minRepos.
 * @param {number} page - The current page number.
 * @param {number} perPage - Items per page.
 * @returns {Promise<{ total_count:number, items:array }>} An object containing the search results and total count.
 */
export async function searchUsers(criteria, page = 1, perPage = 10) {
    const { keyword, location, minRepos } = criteria;
    
    // 1. Initial validation
    if (!keyword || keyword.trim() === '') {
        return { items: [], total_count: 0 };
    }

    // 2. Build the query string (q)
    let q = keyword.trim();
    if (location) {
        q += ` location:${location.trim()}`;
    }
    // Check if minRepos is a valid number greater than or equal to 0
    if (minRepos !== null && minRepos !== '' && !isNaN(parseInt(minRepos, 10)) && parseInt(minRepos, 10) >= 0) {
        q += ` repos:>=${parseInt(minRepos, 10)}`;
    }

    // 3. Build the full URL with pagination parameters
    const searchUrl = new URL(API_BASE_URL);
    searchUrl.searchParams.append('q', q);
    searchUrl.searchParams.append('per_page', perPage);
    searchUrl.searchParams.append('page', page);

    // 4. Set headers
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
        // Use Bearer token for modern API access
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    try {
        // 5. Initial Search API Call
        const response = await fetch(searchUrl.toString(), {
            headers: headers,
        });

        if (response.status === 403) {
             throw new Error('GitHub API rate limit exceeded. Please try again later, or use a GITHUB_TOKEN.');
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json(); // Contains basic user items and total_count

        // 6. Fetch Full Profile Details for each user (CRITICAL for location, bio, public_repos)
        const detailedProfiles = await Promise.all(
            data.items.map(async (user) => {
                try {
                    // Use the user's login name to construct the details URL
                    const detailsUrl = `${USER_DETAILS_BASE_URL}/${user.login}`;
                    const detailsResponse = await fetch(detailsUrl, { headers });

                    if (!detailsResponse.ok) {
                        console.warn(`Could not fetch details for user ${user.login}: ${detailsResponse.status}`);
                        return user; // Return basic data on failure
                    }
                    return await detailsResponse.json(); // Return the enriched profile
                } catch (error) {
                    console.error(`Error fetching detailed profile for ${user.login}:`, error);
                    return user; // Fallback to basic user data
                }
            })
        );

        // 7. Return the combined result
        return {
            total_count: data.total_count,
            items: detailedProfiles, // Contains the full, detailed profiles
        };
    } catch (error) {
        console.error('Error fetching data from GitHub:', error);
        throw error;
    }
}
