// src/App.jsx - Merged for Task 0 and Task 1

import React from 'react';
import './App.css'; 

// --- Task 0 Imports (Adjust paths if necessary) ---
// Assuming your Task 0 components are now directly visible from the root src/
// If they are in the nested project, the paths might be longer:
import RegistrationForm from './form-handling-react/src/components/RegistrationForm'; 
import FormikForm from './form-handling-react/src/components/formikForm'; // Note the lowercase 'formikForm.js'

// --- Task 1 Import ---
import GreetingComponent from './task1-components/GreetingComponent'; 

function App() {
  return (
    <div className="App">

      {/* --- Task 0: Form Handling Comparison --- */}
      <div style={{ display: 'flex', gap: '40px', padding: '20px', justifyContent: 'center' }}>
        <h1>Task 0: Form Handling Comparison</h1>
      </div>
      <div style={{ display: 'flex', gap: '40px', padding: '20px', justifyContent: 'center' }}>
        <RegistrationForm />
        <FormikForm />
      </div>

      <hr style={{ margin: '40px 0' }} />

      {/* --- Task 1: Component Fundamentals --- */}
      <div style={{ padding: '20px' }}>
        <h1>Task 1: Basic Component Usage</h1>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <GreetingComponent name="Alice" />
            <GreetingComponent name="Bob" />
        </div>
      </div>
      
    </div>
  );
}

export default App;