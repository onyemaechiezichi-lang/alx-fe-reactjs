import React from 'react';

// Initialize the Context. We don't need to provide a default value, 
// as we will always wrap consumers in a Provider.
const UserContext = React.createContext(null);

export default UserContext;