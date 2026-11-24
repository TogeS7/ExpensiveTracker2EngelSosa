import React from 'react';
import { Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';

export function Home() {
  const { expenses, isLoaded } = useExpenses();

  const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
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
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Expense Tracker</h1>
        <Link
          to="/settings"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
            padding: '0 0.75rem',
            textDecoration: 'none',
            color: '#2563eb',
            fontWeight: 600,
          }}
        >
          Ajustes
        </Link>
      </header>

      <main style={{ flex: 1, padding: '1.25rem', maxWidth: '720px', width: '100%', margin: '0 auto' }}>
        {!isLoaded ? (
          <p>Cargando datos...</p>
        ) : (
          <section
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <h2 style={{ marginTop: 0 }}>Resumen</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>
              Total: ${totalAmount.toLocaleString('es-AR')}
            </p>
            <p style={{ color: '#475569', marginTop: 0 }}>
              Movimientos registrados: {expenses.length}
            </p>

            {expenses.length === 0 && (
              <p style={{ color: '#64748b' }}>Todavía no registraste gastos.</p>
            )}

            <Link
              to="/expenses"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '44px',
                padding: '0 1.25rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Ir al listado
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}