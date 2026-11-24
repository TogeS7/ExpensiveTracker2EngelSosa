import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ExpensesProvider } from './context/ExpensesContext';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExpensesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExpensesProvider>
  </React.StrictMode>
);