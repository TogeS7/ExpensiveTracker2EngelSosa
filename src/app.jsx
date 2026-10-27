import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ExpensesList } from './pages/ExpensesList';
import { ExpenseDetail } from './pages/ExpenseDetail';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<ExpensesList />} />
        <Route path="/expenses/:id" element={<ExpenseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;