import React, { useState } from 'react';

const RegistrationForm = () => {
  // 1. State for form fields (single source of truth)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const { username, email, password } = formData;

  // 2. Universal Change Handler
  const handleChange = (e) => {
    // Uses the input's 'name' attribute to update the corresponding state key
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    if (error) setError('');
  };

  // 3. Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Basic Validation Check
    if (!username || !email || !password) {
      setError('Error: All fields are mandatory.');
      return;
    }

    console.log('Submitting Controlled Data:', formData);
    alert(`Controlled registration successful for: ${username}`);
    
    // Reset form
    setFormData({ username: '', email: '', password: '' });
    setError('');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>1. Controlled Component</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username" 
          value={username} // Controlled: Value comes from state
          onChange={handleChange} // Controlled: Changes update state
          required
        />
        <br/><br/>
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email} 
          onChange={handleChange} 
          required
        />
        <br/><br/>
        
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password} 
          onChange={handleChange} 
          required
        />
        <br/><br/>
        
        <button type="submit">Register (Controlled)</button>
      </form>
    </div>
  );
};

export default RegistrationForm;