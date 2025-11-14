import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- NEW IMPORT
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* <-- WRAP APP IN ROUTER */}
    <App />
  </BrowserRouter>
);

