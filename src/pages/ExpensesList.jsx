import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockExpenses } from '../mockExpenses';
import { ExpenseCard } from '../components/ExpenseCard';
import { ExpenseFormModal } from '../components/ExpenseFormModal';

export const ExpensesList = () => {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f1f5f9' }}>
      <header style={{ padding: '1rem 2rem', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <Link to="/" style={{ minHeight: '44px', display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#2563eb', fontWeight: '500' }}>← Volver</Link>
        <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Listado de Gastos</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ minHeight: '44px', minWidth: '44px', padding: '0 1rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + Nuevo
        </button>
      </header>

      <main style={{ padding: '2rem', flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        <section>
          {expenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </section>
      </main>

      <ExpenseFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddExpense={handleAddExpense} 
      />
    </div>
  );
};