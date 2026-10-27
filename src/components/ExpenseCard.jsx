import React from 'react';
import { Link } from 'react-router-dom';

export const ExpenseCard = ({ expense }) => {
  return (
    <article style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: '#ffffff',
      borderRadius: '8px',
      marginBottom: '0.75rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{expense.name}</h3>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>{expense.category}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontWeight: 'bold', color: '#0f172a' }}>${expense.amount}</span>
        <Link 
          to={`/expenses/${expense.id}`} 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '44px',
            minWidth: '44px',
            padding: '0 1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
};