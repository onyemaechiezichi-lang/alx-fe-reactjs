import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- NEW IMPORT
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* <-- WRAP APP IN ROUTER */}
    <App />
  </BrowserRouter>
);
