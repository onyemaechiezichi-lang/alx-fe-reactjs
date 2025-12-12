// react-query-demo/src/App.jsx

import React from 'react';
import PostsComponent from './components/PostsComponent';

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