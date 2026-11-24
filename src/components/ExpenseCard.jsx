import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryMeta } from '../data/categories';

export function ExpenseCard({ expense }) {
  const meta = getCategoryMeta(expense.category);

  return (
    <article
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        marginBottom: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>
          {meta.icon} {expense.title}
        </h3>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: meta.color, fontWeight: 600 }}>
          {expense.category}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontWeight: 700, color: '#0f172a' }}>
          ${Number(expense.amount).toLocaleString('es-AR')}
        </span>
        <Link
          to={`/expenses/${expense.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
            padding: '0 0.85rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Detalle
        </Link>
      </div>
    </article>
  );
}