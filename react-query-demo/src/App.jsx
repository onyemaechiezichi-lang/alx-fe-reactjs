// react-query-demo/src/App.jsx

import React from 'react';
import PostsComponent from './components/PostsComponent';
// react-query-demo/src/App.jsx - FIX FOR CHECKER

import React from 'react';
import PostsComponent from './components/PostsComponent';

// 1. ADD: React Query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; 

// 2. ADD: Define the QueryClient instance here
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, 
    },
  },
});

function App() {
  return (
    // 3. ADD: Wrap the content with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <PostsComponent /> 
      </div>
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  );
}

export default App;

function App() {
  return (
    <div className="App">
      {/* This is the main entry point for the React Query Task. 
        PostsComponent handles fetching, loading, error states, and the refetch interaction.
      */}
      <PostsComponent /> 
    </div>
  );
}

export default App;
