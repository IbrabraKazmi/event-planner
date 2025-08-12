// Import React and ReactDOM for rendering the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App';

// Import custom CSS for additional styling
import './index.css';

// Get the root element from the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode for development warnings
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 