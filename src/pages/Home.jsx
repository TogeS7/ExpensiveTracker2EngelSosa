import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header style={{ padding: '1rem 2rem', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>Expense Tracker</h1>
      </header>
      <main style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <section style={{ maxWidth: '600px' }}>
          <h2>Bienvenido al sistema de control de gastos</h2>
          <p style={{ color: '#475569', marginBottom: '2rem' }}>Gestiona tus finanzas personales de manera rápida y eficiente.</p>
          <Link 
            to="/expenses" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              padding: '0 2rem',
              background: '#0f172a',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Ver Listado de Gastos
          </Link>
        </section>
      </main>
    </div>
  );
};