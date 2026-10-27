import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockExpenses } from '../mockExpenses';

export const ExpenseDetail = () => {
  const { id } = useParams();
  
  // La URL es la fuente de verdad, buscamos por ID
  const expense = mockExpenses.find((item) => item.id === id);

  if (!expense) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', minHeight: '100dvh' }}>
        <h2>Gasto no encontrado</h2>
        <Link to="/expenses" style={{ color: '#2563eb', textDecoration: 'none' }}>Volver al listado</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header style={{ padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <Link to="/expenses" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: '#2563eb', fontWeight: '500' }}>← Volver al listado</Link>
      </header>
      <main style={{ padding: '2rem', flex: 1, maxWidth: '600px', width: '100%', margin: '0 auto' }}>
        <article style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0, color: '#0f172a' }}>Detalle del Gasto #{expense.id}</h2>
          <p style={{ fontSize: '1.1rem', color: '#334155' }}><strong>Nombre:</strong> {expense.name}</p>
          <p style={{ fontSize: '1.1rem', color: '#334155' }}><strong>Categoría:</strong> {expense.category}</p>
          <p style={{ fontSize: '1.25rem', color: '#16a34a', fontWeight: 'bold' }}><strong>Monto:</strong> ${expense.amount}</p>
        </article>
      </main>
    </div>
  );
};