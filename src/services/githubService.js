// src/services/githubService.js

const API_BASE_URL = 'https://api.github.com/search/users';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

/**
 * Fetches GitHub users based on criteria (keyword, location, minRepos) and pagination.
 * @param {object} criteria - Object containing keyword, location, and minRepos.
 * @param {number} page - The current page number.
 * @param {number} perPage - Items per page.
 * @returns {Promise<object>} An object containing the search results and total count.
 */
export async function searchUsers(criteria, page = 1, perPage = 10) {
    const { keyword, location, minRepos } = criteria;
    
    if (!keyword) {
        return { items: [], total_count: 0 };
    }

    // 1. Build the query string using all parameters
    let q = keyword;

    if (location) {
        q += ` location:${location}`;
    }

    if (minRepos !== null && minRepos >= 0) {
        q += ` repos:>=${minRepos}`;
    }

    // 2. Build the full URL with pagination parameters
    const url = new URL(API_BASE_URL);
    url.searchParams.append('q', q);
    url.searchParams.append('per_page', perPage);
    url.searchParams.append('page', page);

    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url.toString(), {
            headers: headers,
        });

        if (response.status === 403) {
             console.error('GitHub API rate limit exceeded.');
             throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return data; // Contains items and total_count
    } catch (error) {
        console.error('Error fetching data from GitHub:', error);
        throw error;
    }
}
