import React from 'react';

function Contact() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Contact Us</h1>
      <p>Fill out the form below to get in touch.</p>
      <form style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <input 
          type="email" 
          placeholder="Your Email" 
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
          required 
        />
        <textarea 
          placeholder="Your Message" 
          rows="5" 
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
          required 
        ></textarea>
        <button 
          type="submit" 
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;