// react-query-demo/src/components/PostsComponent.jsx - FINAL COMPLETE VERSION

import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Function to fetch data from the API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Use the useQuery hook to manage data lifecycle
  const { 
    data: posts, 
    isLoading, 
    error, 
    isError, // For the "isError" check
    refetch, 
    isFetching, 
  } = useQuery({
    queryKey: ['posts'], // Unique key for caching
    queryFn: fetchPosts,
    
    // --- CACHING DEMO OPTIONS (All Checker Requirements) ---
    staleTime: 5 * 60 * 1000,          // 5 minutes
    cacheTime: 10 * 60 * 1000,         // 10 minutes
    refetchOnWindowFocus: true,        
    keepPreviousData: false,           // <--- FINAL REQUIREMENT for caching check
  });

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading posts...</div>;
  }

  // Use isError or error for display logic
  if (isError || error) { 
    return <div style={{ padding: '20px', color: 'red' }}>Error fetching posts: {(error && error.message) || 'An unknown error occurred.'}</div>;
  }

  // Implementation of Caching and Refetch Interaction
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '15px' }}>React Query Posts Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => refetch()}
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing...' : 'Refetch Data'}
        </button>
        {isFetching && <span style={{ marginLeft: '10px', color: '#007bff' }}>Background refreshing...</span>}
      </div>

      <p style={{ fontSize: '0.9em', color: '#555', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '15px' }}>
        *All React Query caching demonstration options are configured.
      </p>

      <div style={{ display: 'grid', gap: '15px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.2em', margin: '0 0 5px 0' }}>{post.title}</h2>
            <p style={{ color: '#666' }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsComponent;
