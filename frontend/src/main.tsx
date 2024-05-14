import React from 'react'
import { render } from 'react-dom'; // Import the render function from 'react-dom'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';


render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);