import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ✅ CORRECTED IMPORTS: Added .jsx extension
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';

// Optional: Footer Component
function Footer() {
  const footerStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    position: 'fixed', 
    bottom: 0,
    width: '100%',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
    fontSize: '0.9em'
  };
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}


function App() {
  const appContainerStyle = {
    paddingBottom: '40px' // Space for the fixed footer
  };

  return (
    <BrowserRouter>
      <Navbar /> 
      
      <div style={appContainerStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;