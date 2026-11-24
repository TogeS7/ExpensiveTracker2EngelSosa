import React from 'react';
import { Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';

export function Settings() {
  const { settings, updateSetting } = useExpenses();

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
      </header>

      <main style={{ flex: 1, padding: '1.25rem', maxWidth: '640px', width: '100%', margin: '0 auto' }}>
        <section style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '10px' }}>
          <h1 style={{ marginTop: 0 }}>Ajustes</h1>

          <label
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: '44px',
              padding: '0.5rem 0',
              fontWeight: 600,
            }}
          >
            <span>Notificaciones</span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.notifications}
              onChange={(e) => updateSetting('notifications', e.target.checked)}
              style={{ width: '44px', height: '24px', cursor: 'pointer' }}
            />
          </label>

          <label
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: '44px',
              padding: '0.5rem 0',
              fontWeight: 600,
            }}
          >
            <span>Modo oscuro</span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.darkMode}
              onChange={(e) => updateSetting('darkMode', e.target.checked)}
              style={{ width: '44px', height: '24px', cursor: 'pointer' }}
            />
          </label>
        </section>
      </main>
    </div>
  );
}