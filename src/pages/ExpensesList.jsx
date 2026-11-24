import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
import { ExpenseCard } from '../components/ExpenseCard';
import { ExpenseFormModal } from '../components/ExpenseFormModal';

export function ExpensesList() {
  const { expenses, isLoaded } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f1f5f9' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
            textDecoration: 'none',
            color: '#2563eb',
            fontWeight: 600,
          }}
        >
          ← Inicio
        </Link>
        <h1 style={{ margin: 0, fontSize: '1.15rem' }}>Gastos ({expenses.length})</h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{
            minWidth: '44px',
            minHeight: '44px',
            padding: '0 0.9rem',
            backgroundColor: '#16a34a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          + Nuevo
        </button>
      </header>

      <main style={{ flex: 1, padding: '1.25rem', maxWidth: '720px', width: '100%', margin: '0 auto' }}>
        <section style={{ marginBottom: '1rem' }}>
          <strong>Total acumulado: ${totalAmount.toLocaleString('es-AR')}</strong>
        </section>

        <section>
          {!isLoaded ? (
            <p>Cargando gastos...</p>
          ) : expenses.length === 0 ? (
            <p>Todavía no registraste gastos.</p>
          ) : (
            expenses.map((expense) => <ExpenseCard key={expense.id} expense={expense} />)
          )}
        </section>
      </main>

      <ExpenseFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}