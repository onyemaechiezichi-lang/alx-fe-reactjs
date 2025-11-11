function Services() {
  const serviceStyle = {
    listStyleType: 'disc',
    marginLeft: '20px',
  };

  const listItemStyle = {
    marginBottom: '10px',
    padding: '5px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#dc3545' }}>Our Services</h1>
      <ul style={serviceStyle}>
        <li style={listItemStyle}>Technology Consulting</li>
        <li style={listItemStyle}>Market Analysis</li>
        <li style={listItemStyle}>Product Development</li>
      </ul>
    </div>
  );
}

export default Services;