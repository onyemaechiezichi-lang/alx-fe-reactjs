// src/task1-components/GreetingComponent.jsx

import React from 'react';

// This component uses a 'prop' called 'name'
const GreetingComponent = (props) => {
  return (
    <div style={{ padding: '15px', border: '1px solid #777', margin: '10px 0' }}>
      <h2>Hello, {props.name}!</h2>
      <p>This is a basic React functional component demonstrating the use of JSX and Props.</p>
    </div>
  );
};

export default GreetingComponent;