import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#343a40',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '1.1em',
    padding: '5px 10px',
    borderRadius: '3px',
    transition: 'background-color 0.3s'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

export default Navbar;