import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';

export function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, removeExpense } = useExpenses();

  const expense = expenses.find((item) => item.id === id);

  const handleDelete = () => {
    if (!expense) return;
    const confirmed = window.confirm(`¿Eliminar el gasto "${expense.title}"?`);
    if (!confirmed) return;

    removeExpense(expense.id);
    navigate('/expenses', { replace: true });
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header
        style={{
          padding: '1rem 1.25rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Link
          to="/expenses"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
            textDecoration: 'none',
            color: '#2563eb',
            fontWeight: 600,
          }}
        >
          ← Volver al listado
        </Link>
      </header>

      <main style={{ flex: 1, padding: '1.25rem', maxWidth: '640px', width: '100%', margin: '0 auto' }}>
        {!expense ? (
          <section style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '10px' }}>
            <h1 style={{ marginTop: 0 }}>Gasto inexistente</h1>
            <p>No se encontró un gasto con el identificador solicitado en la URL.</p>
            <Link to="/expenses">Volver a gastos</Link>
          </section>
        ) : (
          <article
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <h1 style={{ marginTop: 0 }}>{expense.title}</h1>
            <p><strong>Monto:</strong> ${Number(expense.amount).toLocaleString('es-AR')}</p>
            <p><strong>Categoría:</strong> {expense.category}</p>
            <p><strong>Notas:</strong> {expense.notes || 'Sin notas'}</p>
            <p><strong>Fecha:</strong> {expense.createdAt}</p>

            <button
              type="button"
              onClick={handleDelete}
              style={{
                minHeight: '44px',
                padding: '0 1.25rem',
                marginTop: '1rem',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Eliminar gasto
            </button>
          </article>
        )}
      </main>
    </div>
  );
}