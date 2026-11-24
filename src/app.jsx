import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ExpensesList } from './pages/ExpensesList';
import { ExpenseDetail } from './pages/ExpenseDetail';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/expenses" element={<ExpensesList />} />
      <Route path="/expenses/:id" element={<ExpenseDetail />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;