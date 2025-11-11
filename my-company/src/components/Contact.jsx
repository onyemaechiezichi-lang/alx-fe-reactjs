import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${formData.name}! We will contact you soon.`);
    setFormData({ name: '', email: '', message: '' }); // Clear the form
  };
 const inputStyle = {
    display: 'block', 
    margin: '10px 0', 
    padding: '10px', 
    width: '100%', 
    maxWidth: '400px', 
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ffc107',
    color: '#343a40',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#ffc107' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{...inputStyle, minHeight: '100px'}}
          required
        />
        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>
    </div>
  );
}

export default Contact;