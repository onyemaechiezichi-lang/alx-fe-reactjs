// react-query-demo/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import necessary components from React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; 

// 1. Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set a stale time to demonstrate caching (5 minutes)
      staleTime: 5 * 60 * 1000, 
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap the entire application with the QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* 3. Add Devtools for cache inspection (optional but good for testing) */}
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  </React.StrictMode>,
);